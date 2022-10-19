// S'inscrire

import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const pseudoError = document.querySelector(".pseudo.error");
  const emailError = document.querySelector(".email.error");
  const passwordError = document.querySelector(".password.error");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Vérifie si les deux mots de passes correspondent
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    passwordConfirmError.innerHTML = "";

    if (password !== controlPassword) {
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `http://localhost:5000/api/user/signup`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          window.location = "/profil";
        })
        .catch((err) => {
          console.log(err);
          pseudoError.innerHTML = err.response.data.error.pseudo;
          emailError.innerHTML = err.response.data.error.email;
          passwordError.innerHTML = err.response.data.error.password;
        });
    }
  };

  return (
    <>
      <div>
        <form
          className="rounded-3 border border-2 border-secondary col-lg-9 mx-auto mt-5 p-2"
          action=""
          onSubmit={handleRegister}
          id="sign-up-form"
        >
          <label className="form-label" htmlFor="pseudo">
            Pseudo
          </label>
          <input
            type="text"
            name="pseudo"
            className="form-control"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
            placeholder="Minimum 4 caractères"
          />
          <div className="text-primary pseudo error"></div>
          <br />

          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="nom@email.com"
          />
          <div className="text-danger email error"></div>
          <br />

          <label className="form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="6 caractères minimum incluant 1 majuscule et 1 chiffre"
          />
          <div className="text-danger password error"></div>
          <br />

          <label className="form-label" htmlFor="password-conf">
            Confirmation du mot de passe
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error text-danger"></div>
          
          <div className="mt-4 text-center">
            <input
              className="col-3 btn btn-success mb-3 text-light"
              type="submit"
              value="Valider l'inscription"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
