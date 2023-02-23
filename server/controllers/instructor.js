import User from "../models/user";
// import queryString from "query-string"; //legacy - replaced by URLSearchParams
import Stripe from "stripe";

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
    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    });
    //5. then send the account link as response to frontend
    // we are building the query sting to be sent back to frontend
    const url = new URL(`${accountLink.url}`);
    const params = new URLSearchParams(url.search);

    res.send(`${url}?${params.toString(accountLink)}`);
  } catch (err) {
    console.log("MAKE INSTRUCTOR ERR", err);
  }
};
