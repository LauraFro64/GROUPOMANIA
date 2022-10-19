// Se connecter

import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    await axios({
      method: "post",
      url: `http://localhost:5000/api/user/signin`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        localStorage.setItem("token", `${res.data.token}`);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
        emailError.innerHTML = err.response.data.error.email;
        passwordError.innerHTML = err.response.data.error.password;
      });
  };

  return (
    <>
      <div>
        <form
          className="rounded-3 border border-2 border-secondary col-lg-9 mx-auto mt-1 p-2"
          action=""
          onSubmit={handleLogin}
          id="sign-in-form"
        >
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

          <div className="text-center">
            <input
              className="col-3 btn btn-success mb-3 text-light"
              type="submit"
              value="Se connecter"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
