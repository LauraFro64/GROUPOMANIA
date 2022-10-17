const mongoose = require('mongoose');
const { isEmail } = require('validator');
// améliore les messages d'erreur lors de l'enregistrement de données uniques
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  pseudo: {type: String, required: true, unique: true, minLength: 3, maxLength: 55},
  email: { type: String, required: true, unique: true, validate: [isEmail], lowercase: true },
  password: { type: String, required: true},
  isAdmin: { type: Boolean, default: false}
});

// Vérification de l'unicité de l'adresse e-mail
userSchema.plugin(uniqueValidator);

// model(): Transforme le modèle en modèle ré-utilisable
module.exports = mongoose.model('User', userSchema);