const User = require("../models/user");
// Permet le chiffrage du mot passe avec la méthode .hash()
const bcrypt = require("bcrypt");
// Permet de créer et vérifier un token d'authentification
const jwt = require("jsonwebtoken");
const { signUpErrors } = require("../errors");

// SignUp = inscription
exports.signUp = (req, res) => {
  // .hach(): Hachage, cryptage du mot de passe
  // "Salage = 10 tours de l'algorithme" + valeur élevée, + l'exécution de la fonction sera longue mais + le hachage sera sécurisé
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
        isAdmin: false,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((err) => {
          const error = signUpErrors(err);
          // Statut 400 - Bad Request: indique que la syntaxe de la requête est invalide
          res.status(400).json({ error });
        });
    })
    // Statut 500 - Internal Server Error: indique une erreur interne du serveur non identifiée
    .catch((error) => res.status(500).json({ error }));
};

// Login = se connecter
exports.signIn = (req, res) => {
    // findOne(): recherche et renvoie le document qui correspond aux critères de sélections donnés 
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user === null) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      // Compare le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de donnée
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            //.sign(): Encodage du nouveau token qui contient l'id de l'utilisateur en tant que payload (données encodées)
            token: jwt.sign(
              { userId: user._id },
              // Chaîne secrète d'encodage du token (normalement bcp plus complexe)
              process.env.RANDOM_TOKEN_SECRET,
              // Durée de validité du token
              { expiresIn: "24h" }
            ),
            pseudo: user.pseudo,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//getUser pour obtenir les infos
exports.getUser = (req, res) => {
  User.findOne({ _id: req.auth.userId })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};
