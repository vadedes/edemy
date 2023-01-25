import User from '../models/user';
import { hashPassword, comparePassword } from '../utils/auth';

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
