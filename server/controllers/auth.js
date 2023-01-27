import User from '../models/user';
import { hashPassword, comparePassword } from '../utils/auth';
import jwt from 'jsonwebtoken';

//Register Controller
//async because we are making request to db
export const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;

    //validate incoming data must pass all conditions
    if (!name) return res.status(400).send('Name is requried');

    if (!password || password.length < 6) {
      return res.status(400).send('Password is required and should be at least 6 characters long');
    }

    let userExist = await User.findOne({ email }).exec();
    if (userExist) {
      return res.status(400).send('Email is already taken');
    }
    if (!email) {
      return res.status(400).send('Email is required');
    }

    //if passed all checks hash password
    const encryptPassword = await hashPassword(password);

    //once password is hashed proceed to register using User model
    const user = new User({
      name,
      email,
      password: encryptPassword,
    });

    await user.save(); //save to db

    // console.log('saved user', user);
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send('Error. Try again.');
  }
};

//Login Controller
export const login = async (req, res) => {
  try {
    //first is to make sure data is received, if received proceed to next line
    // console.log(req.body);

    //compare user's password, but first check if our db has user with that email
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send('No user found.');

    //check password, first arg is the password from request, 2nd arg is from database, if passed
    const match = await comparePassword(password, user.password);

    //create signed jwt - don't forget to import jsonwebtoken first
    //inside sign we need 2 args, first one is the data of user from database
    //2nd arg is the UWT secret from env file
    //3rd arg is expiry of token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    //return user and token to back to client, exclude hashed password
    user.password = undefined;
    //send token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      //secure: true, //only works on https
    });
    //send user as json response
    res.json(user);
  } catch (error) {
    console.log(err);
    return res.status(400).send('Error. Try again.');
  }
};
