// Gestionnaire de fichiers entrant dans les requêtes HTTP
const multer = require('multer');

// Extensions autorisées de fichier
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


// destination: indique à multer où l'image doit être stockée
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },

  // Modifications des noms des fichiers images pour les rendres uniques
  filename: (req, file, callback) => {
    // Remplace les espaces par des underscores
    const name = file.originalname.split(' ').join('_');
    // Résoud l'extension de fichier approprié
    const extension = MIME_TYPES[file.mimetype];
    // Ajout d'un timestamp (horodatage) au nom du fichier pour le rendre unique
    callback(null, name + Date.now() + '.' + extension);
  }
});
// Export de l'élément multer configuré / .single() indique la gestion uniquement des images téléchargées
module.exports = multer({storage: storage}).single('file');