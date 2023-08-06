const Calculator = require("../models/calculator");
// exports.postResult = (req, res) => {
//   let result = eval(req.body.calculation);
//   Calculator.create({
//     calculation: req.body.calculation,
//     result: result,
//     userId: req.user.id,
//   })
//     .then((output) => {
//       console.log(output);
//       res.status(201).json(output);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.postResult = async (req, res, next) => {
  try {
    console.log(req.body);
    // const amount = req.body.amount;
    // const description = req.body.description;
    // const category = req.body.category;
    const calculation = req.body.calculation;
    const result = eval(req.body.calculation);

    const data = await Calculator.create({
      calculation: calculation,
      result: result,
      userId: req.user.id,
    });
    res.status(200).json("Expense Added Successfully");
  } catch (err) {
    console.log(err);
  }
};

exports.getResult = async (req, res, next) => {
  // Calculator.findAll()
  //   .then((calculations) => {
  //     res.status(201).json(calculations);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  try {
    console.log("In get Expense", req.userid);
    const data = await Calculator.findAll({ where: { userId: req.user.id } });
    console.log("Data get successfully");
    res.status(200).json({ message: "Expense Added Successfully", data: data });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteResult = async (req, res, next) => {
  // const calcId = req.params.calcId;
  // Calculator.destroy({ where: { id: calcId } })
  //   .then(() => {})
  //   .catch((err) => {
  //     console.log(err);
  //   });
  const calcId = req.params.calc;
  console.log("In deleted Function");
  Calculator.destroy({ where: { id: calcId } })
    .then(() => {
      console.log("Item deleted ");
      return res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      alert("Error");
    });
};
