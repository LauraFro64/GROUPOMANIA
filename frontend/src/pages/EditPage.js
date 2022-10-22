import Edit from "../components/Edit";

const EditPage = () => {
  // Récuperation de l'id et du token de la personne connectée
  let userIdLocalStorage = localStorage.getItem("userId");
  let tokenLocalStorage = localStorage.getItem("token");

  // Si null, alors la personne est renvoyée sur la page de connexion/inscription
  if (tokenLocalStorage === null && userIdLocalStorage === null) {
    window.location = "/connexion";
  }

  //permet d'accéder aux arguments décodés de la requête contenus dans l'URL ('GET')
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  return <Edit id={id} />;
};

export default EditPage;
