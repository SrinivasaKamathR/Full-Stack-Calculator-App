const User = require("../models/user");

const bcrypt = require("bcrypt");

// exports.SignUpController = async (req, res, next) => {
//   try {
//     const cycles = 10;
//     bcrypt.hash(req.body.password, cycles, async (err, hash) => {
//       try {
//         const user = await User.create({
//           username: req.body.username,
//           email: req.body.email,
//           password: hash,
//         });
//         res.status(200).json({ newuser: user });
//       } catch (error) {
//         res.status(504).json({ error: error.name });
//       }
//     });
//   } catch (error) {
//     res.status(504).json({ error: error });
//   }
// };

exports.SignUpController = async (req, res, next) => {
  try {
    console.log(req.body);
    // const email = req.body.enteredEmail;
    // const password = req.body.enteredPassword;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log(username, email, password);
    const data1 = await User.findByPk(email);
    console.log(data1);

    if (data1) {
      res.json("User Already Available");
    } else {
      console.log("User added Successfully");
      bcrypt.hash(password, 10, async (err, hash) => {
        if (!err) {
          const data = await User.create({
            username: username,
            email: email,
            password: hash,
          });
          res.status(200).json("Sign Up Successful");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }

  console.log("received signup data");
};
