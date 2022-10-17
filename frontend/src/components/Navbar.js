import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import logo from "../images/icon-left-font.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");
  const admin = <FontAwesomeIcon icon={faLockOpen} />;

  // GetUser = récupère les tertiaryrmations de l'utilisateur
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="container-fluid">
      <nav className="border navbar border-secondary border-2 rounded-2 mt-2">
        <NavLink className="navbar col-sm-3" to="/">
          <img className="img-fluid" src={logo} alt="logo" />
        </NavLink>
        {user ? (
          <div>
            <h3 className="mx-2">
              Bienvenue {user.pseudo}{" "}
              {user.isAdmin === true ? <> {admin} </> : null}
            </h3>
            <NavLink className="btn btn-tertiary mx-2" to="/create">
              Poster une publication
            </NavLink>
            <Logout />
          </div>
        ) : (
          <NavLink className="btn btn-primary text-light mx-2" to="/profil">
            {" "}
            Connexion / Inscription
          </NavLink>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
