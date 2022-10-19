const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema 
.is().min(6)          // Minimum de 6 caractères requis
.is().max(30)         // Maximum de 30 caractères autorisés
.has().uppercase()    // Doit contenir au moins une majuscule
.has().lowercase()    // Doit contenir au moins une minuscule
.has().digits()       // Doit contenir au moins un chiffre
.has().not().spaces() // Ne doit pas contenir d'espace
module.exports = passwordSchema;