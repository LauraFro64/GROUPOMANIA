import React from "react";
import CreatePost from "../components/CreatePost";
function Create() {
  // Récuperation de l'id et du token de la personne connectée
  let userIdLocalStorage = localStorage.getItem("userId");
  let tokenLocalStorage = localStorage.getItem("token");

  // Si null, alors la personne est renvoyée sur la page de connexion/inscription
  if (tokenLocalStorage === null && userIdLocalStorage === null) {
    window.location = "/connexion";
  }
  return <CreatePost />;
}

export default Create;
