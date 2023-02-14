import User from '../models/user';
import { hashPassword, comparePassword } from '../utils/auth';
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';
import { nanoid } from 'nanoid'


const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION
}

const SES = new AWS.SES(awsConfig);

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

    //if it does not match, show error
    if(!match) return res.status(400).send('username or password does not match.');

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
    //improve this message later
    console.log(error);
    return res.status(400).send('Error. Try again.');
  }
};

//LOGOUT
export const logout = async (req, res) => {
  try {
    //clear cookie
    res.clearCookie('token');
    return res.json({ message: 'Signout successful.' });
  } catch (error) {
    console.log(error);
  }
};

//Current User
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id).select('-password').exec();
    console.log('CURRENT_USER', user);
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

//Test email using AWS SES
export const sendTestEmail = async (req, res) => {
  // console.log('send email using SES')
  // res.json({ok:true})
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: ['dave@vadedesign.com'],
    },
    ReplyToAddresses: [process.env.EMAIL_FROM],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <h1>
                Reset password link
              </h1>
              <p>Please use the following link to reset your password</p>
            </html>
          `
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Password reset link",
      }
    }
  }

  const emailSent = SES.sendEmail(params).promise();
  emailSent.then((data)=>{
    console.log(data);
    res.json({ok:true});
  })
  .catch((err) => {
    console.log(err);
  })
}

//forgot password
//use nanoid to generate shortcode to be sent to db and user
export const forgotPassword = async (req, res) => {
try {
  const {email} = req.body;
  // console.log(email)
  const shortCode = nanoid(6).toUpperCase();
  const user = await User.findOneAndUpdate(
    {email}, 
    {passwordResetCode: shortCode})
  
  if(!user) return res.status(400).send('user not found.');

  //prepare for email
const params = {
  Source: process.env.EMAIL_FROM,
  Destination: {
    ToAddresses: [email]
  },
  Message: {
    Body: {
      Html: {
        Charset: 'UTF-8',
        Data: `
          <html>
            <h1>Reset password</h1>
            <p>Use this code to reset your password.</p>
            <h2 style="color:red;">${shortCode}</h2>
            <i>edemy.com</i>
          </html>
        `
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: "Reset Password",
    }
  },
}

const emailSent = SES.sendEmail(params).promise();
  emailSent.then((data)=> {
    console.log(data)
    res.json({ok: true});
  })
  .catch(err => {
    console.log(err)
  })

} catch (err) {
  console.log(err)
}
}


//Reset password
export const resetPassword = async (req, res) => {
  try {
    //access email, code, and resetPassword from req body
    const {email, code, newPassword} = req.body;
    // console.table({email, code, newPassword});

    //hash new password before saving
    const encryptPassword = await hashPassword(newPassword);

    //find user and update, 2nd arg - the thing I want to update
    const user = User.findOneAndUpdate({
      email,
      passwordResetCode: code,
    }, {
      password: encryptPassword,
      passwordResetCode: "",
    }).exec();

    //send response
    res.json({ok: true});

  } catch (err) {
    console.log(err)
    return res.status(400).send('Error! Try again.')
  }
}