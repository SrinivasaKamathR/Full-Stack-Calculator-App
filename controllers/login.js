const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// function generateAccessToken(id) {
//   return jwt.sign({ userid: id }, "urbf67q34bnasdbj4373qniasdjnv473dkf584");
// }
// exports.logInController = async (req, res, next) => {
//   try {
//     const user = await User.findAll({ where: { email: req.body.email } });
//     if (user.length > 0) {
//       bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//         if (result == true) {
//           res.status(201).json({
//             message: "User login successful",
//             token: generateAccessToken(user[0].id),
//           });
//         } else {
//           res.status(401).json({ error: "User is not authorized" });
//         }
//       });
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

function generateWebToken(id, email) {
  return jwt.sign({ userid: id, email: email }, "secretkey");
}

exports.logInController = async (req, res, next) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const data1 = await User.findAll({ where: { email } });
    console.log("data length", data1.length);
    if (data1.length > 0) {
      console.log(data1[0].id);
      bcrypt.compare(password, data1[0].password, (err, result) => {
        console.log("result bcyrpt", result);
        if (result) {
          res.status(200).json({
            message: "Login Successful",
            token: generateWebToken(data1[0].id, data1[0].email),
          });
        } else {
          res.status(401).json("Password is Wrong");
        }
      });
      // if(data1.password == password){
      //     console.log("User Available")
      //     res.status(200).json("Login Successful")
      // }else{
      //     console.log("User Password is wrong ")
      // }
    } else {
      res.json("User Not Found");

      console.log("User not Found");
    }

    console.log("received login data");
  } catch (error) {
    console.log(error);
  }
};
