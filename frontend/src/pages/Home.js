import AllPost from "../components/AllPost";

function Home() {
  // Récuperation de l'id et du token de la personne connectée
  let userIdLocalStorage = localStorage.getItem("userId");
  let tokenLocalStorage = localStorage.getItem("token");

  // Si null, alors la personne est renvoyée sur la page de connexion/inscription
  if (tokenLocalStorage === null && userIdLocalStorage === null) {
    window.location = "/connexion";
  }
  return <AllPost />;
}

export default Home;
