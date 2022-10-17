// Importation modele Post
const Post = require("../models/post");
// File System: Permet de créer et gérer les fichiers pour y stocker ou lire des informations 
const fs = require("fs");
const { postErrors } = require("../errors");

// Récupérer tous les posts
exports.getAllPosts = (req, res) => {
  Post.find() 
    .then((allPosts) => res.status(200).json(allPosts))
    .catch((error) => res.status(400).json({ error }));
};

// Récupérer un seul post
exports.getOnePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((onePost) => res.status(200).json(onePost))
    .catch((error) => res.status(404).json({ error }));
};

// Créer un post
exports.createPost = (req, res) => {
  const postObject = req.file
    ? {
      // Opération spread (syntaxe de décomposition pour étendre un itérable en lieu et place de plusieurs arguments) permettant de faire une copie du req.body
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body, imageUrl: `` };
  delete postObject._id;
  delete postObject._userId;
  const post = new Post({
    ...postObject,
    userId: req.auth.userId,
    likes: 0,
    dislikes: 0,
  });
  // Méthode permettant l'enregistrement du post dans la bdd
  post
    .save()
    .then(() => {
      res.status(201).json({ message: "Post enregistré !" });
    })
    .catch((err) => {
      const error = postErrors(err);
      res.status(400).json({ error });
    });
};

// Modifier un post
exports.modifyPost = (req, res) => {
  const isAdmin = req.body.isAdmin;
  const updatePost = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body, imageUrl: `` };

  delete updatePost._userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId === req.auth.userId || isAdmin === "true") {
        Post.updateOne(
          { _id: req.params.id },
          { ...updatePost, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Post modifié!" }))
          .catch((err) => {
            const error = postErrors(err);
            res.status(400).json({ error });
          });
      } else {
        res.status(401).json({ message: "Non autorisé" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Supprimer un post
exports.deletePost = (req, res) => {
  const isAdmin = req.body.isAdmin;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId === req.auth.userId || isAdmin === true) {
        const filename = post.imageUrl.split("/images/")[1];
        // lui passer le post à supprimer et le callback à exécuter une fois le post supp
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Post supprimée !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      } else {
        res.status(401).json({ message: "Non autorise" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Vérification des likers si + 1 like et/ou +1 dislike
exports.likePost = (req, res, next) => {
  // req.params: Récupère l'id dans l'url de la requête
  Post.findOne({ _id: req.params.id })  // (id -> _id): Mise au format de l'id récupéré
    .then((post) => {
      let user = req.auth.userId;

      if (req.body.like == 1) {
        if (!post.usersLiked.includes(user)) {
          if (!post.usersDisliked.includes(user)) {
            post.likes++;
            post.usersLiked.push(user);
          } else {
            post.likes++;
            post.usersLiked.push(user);
            post.dislikes--;
            post.usersDisliked.splice(post.usersDisliked.indexOf(user), 1);
          }
        } else {
          post.likes--;
          post.usersLiked.splice(post.usersLiked.indexOf(user), 1);
        }
      }

      if (req.body.like == -1) {
        if (!post.usersDisliked.includes(user)) {
          if (!post.usersLiked.includes(user)) {
            post.dislikes++;
            post.usersDisliked.push(user);
          } else {
            post.dislikes++;
            post.usersDisliked.push(user);
            post.likes--;
            post.usersLiked.splice(post.usersLiked.indexOf(user), 1);
          }
        } else {
          post.dislikes--;
          post.usersDisliked.splice(post.usersDisliked.indexOf(user), 1);
        }
      }

      post.save();
      res.status(200).json({ message: "Changement like pris en compte" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
