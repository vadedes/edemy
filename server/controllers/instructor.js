import User from "../models/user";
// import queryString from "query-string"; //legacy - replaced by URLSearchParams
import Stripe from "stripe";
import Course from "../models/course";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2022-11-15",
});

export const makeInstructor = async (req, res) => {
  try {
    //1. find user from the database
    const user = await User.findById(req.auth._id).exec();

    //2. if user doesn't have stripe_account_id yet, then create new
    if (!user.stripe_account_id) {
      const account = await stripe.accounts.create({
        type: "express",
      });
      // console.log('ACCOUNT =>', account.id)
      user.stripe_account_id = account.id;
      user.save();
    }

    //3. create account link based on account id (for frontend to complete onboarding)
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    });
    //4. pre-fill any info such as email (optional), then send url response to frontend
    const searchParams = new URLSearchParams();
    searchParams.append("stripe_user[email]", user.email);
    const accountLinkWithPrefilledEmail = `${accountLink.url}?${searchParams.toString()}`;

    //5. then send the account link as response to frontend
    // we are building the query sting to be sent back to frontend
    res.send(accountLinkWithPrefilledEmail);
  } catch (err) {
    console.log("MAKE INSTRUCTOR ERR", err);
  }
};

export const getAccountStatus = async (req, res) => {
  try {
    //get the user from database
    const user = await User.findById(req.auth._id).exec();

    //find the account from stripe because we need to get the updated information
    //this will only exist if the user has successfully completed the onboarding process
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    // console.log("ACCOUNT =>", account)//check what info stripe returns about this user
    //check if account charges is enabled
    if (!account.charges_enabled) {
      return res.status(401).send("Unauthorized");
    } else {
      //save the object stripe returned abount the user
      const statusUpdated = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: account,
          $addToSet: { role: "Instructor" },
        },
        { new: true }
      )
        .select("-password")
        .exec(); //don't send the password to frontend
      res.json(statusUpdated); //send to frontend
    }
  } catch (err) {
    console.log(err);
  }
};

export const currentInstructor = async (req, res) => {
  try {
    //1. Find the user from database
    let user = await User.findById(req.auth._id).select("-password").exec();

    if (!user.role.includes("Instructor")) {
      return res.sendStatus(403);
    } else {
      res.json({ ok: true });
    }
  } catch (error) {}
};

export const instructorCourses = async (req, res) => {
  try {
    //1. get the courses that belongs to the currently logged in instructor
    //sort to place the latest courses on top
    const courses = await Course.find({ instructor: req.auth._id }).sort({ createdAt: -1 }).exec();

    //2. send courses object as json response to the frontend
    res.json(courses);
  } catch (err) {
    console.log(err);
  }
};
