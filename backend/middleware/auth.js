// Gestion des token
const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {

        // Extraction du token contenu dans le header Authorization
        // .split(): Bearer / Récupération du contenu après l'espace 
        // "Bearer Token" est un JSON Web Token dont le rôle est d'indiquer que l'utilisateur qui accède aux ressources est bien authentifié.
       const token = req.headers.authorization.split(' ')[1];
        // .verify(): Décodage du token -> Renverra une erreur si celui-ci n'est pas valide
       const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
       // Extraction de l'id contenu dans le token
       const userId = decodedToken.userId;
       req.auth = {
           userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};