//This is a file containing utility functions that we can use to hash and compare hashed password for this app.
import bcrypt from 'bcrypt';

//clean password will be received from the frontend and the hashed password will be retrieved from the database

//hash password received from frontend
export const hashPassword = (password) => {
  //promise will give either success or failed
  return new Promise((resolve, reject) => {
    //use bcrypt to hash password
    //salt password - strength 8, 12, 14 (12 middle strength)
    bcrypt.genSalt(12, (err, salt) => {
      //if there's an error reject and show error
      if (err) {
        reject(err);
      }

      //hash password with salt, 3rd arg callback function to resolve hashing of password
      bcrypt.hash(password, salt, (err, hash) => {
        //if there's an error reject and show error otherwise resolve on next line
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

//compare received password with the hashedPassword from the database
export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
