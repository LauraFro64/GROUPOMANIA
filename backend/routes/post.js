const express = require('express');

// Permet de créer des routeurs séparés pour chaque route principale de l'application
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

// Enregistrement des routes individuelles CRUD
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, multer, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost);

// Exportation des méthodes attribuées aux routes
module.exports = router;