const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet'); // Package permettant la sécurisation des en-têtes http
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const app = express();

// Variable d'environnement
// Exportation et protection des données secrètes vers le fichier .env
require('dotenv').config();

//Connexion à la base de données
mongoose.connect(
  process.env.DB_USER_PASS,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Préventions contre les attaques XSS (faille de sécurité qui permet à un attaquant d'injecter dans un site web un code client malveillant)
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Paramétrage des en-têtes pour éviter les erreurs de CORS 
// app.use(): permet d'attribuer un middleware à une route spécifique de l'application
app.use((req, res, next) => {

  // Permet l'accès à notre API depuis n'importe quelle origine "*"
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Permet l'ajout des en-têtes mentionnés aux requêtes envoyées vers l'API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  // Permet l'envoi des requêtes avec les méthodes mentionnées
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})


// Récupération des requêtes du body au format JSON
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes); 

// Dossier statique pour le dossier image
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
