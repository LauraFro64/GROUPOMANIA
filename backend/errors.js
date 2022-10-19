module.exports.signUpErrors = (err) => {
  let error = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    error.pseudo = "Pseudo incorrect ou déjà pris";

  if (err.message.includes("email"))
    error.email = "Email incorrect ou déjà pris";

  return error;
};

module.exports.signInErrors = (err) => {
  let error = { email: "", password: "" };

  if (err.message.includes("email")) error.email = "Adresse email inconnue";

  if (err.message.includes("password"))
    error.password = "Le mot de passe ne correspond pas";

  return error;
};

module.exports.postErrors = (err) => {
  let errors = { length: "" };

  if (err.message.includes("Post"))
    errors.length = "Le titre ne doit pas dépasser 60 caracteres";

  return errors;
};
