const Calculator = require("../models/calculator");
exports.postResult = (req, res) => {
  let result = eval(req.body.calculation);
  Calculator.create({
    calculation: req.body.calculation,
    result: result,
    userId: req.user.id,
  })
    .then((output) => {
      console.log(output);
      res.status(201).json(output);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getResult = (req, res) => {
  Calculator.findAll()
    .then((calculations) => {
      res.status(201).json(calculations);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteResult = (req, res) => {
  const calcId = req.params.calcId;
  Calculator.destroy({ where: { id: calcId } })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
