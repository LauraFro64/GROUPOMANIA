const checkEmail = require("email-validator");

module.exports = (req, res, next) => {
  if (!checkEmail.validate(req.body.email)) {
    return res
      .status(400)
      .json({ message: "Adresse mail incorrecte ou déjà prise." });
  } else {
    next();
  }
};