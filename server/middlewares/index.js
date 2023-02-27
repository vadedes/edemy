const { expressjwt: expressJwt } = require("express-jwt");
import User from "../models/user";

export const requireSignin = expressJwt({
  getToken: (req, res) => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

//middleware to make sure that the user who's trying to save the course
//has a role of instructor
export const isInstructor = async (req, res, next) => {
  try {
    //1. get the user from the database
    const user = await User.findById(req.auth._id).exec();

    //2. check the user's role if instructor
    if (!user.role.includes("Instructor")) {
      return res.sendStatus(403);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Only instructors are allowed create a course." });
  }
};
