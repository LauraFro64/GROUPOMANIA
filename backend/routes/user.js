const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

const checkPassword = require('../middleware/password-validator');
const checkEmail = require('../middleware/email-validator');

router.post('/signup', checkEmail, checkPassword, userCtrl.signUp);
router.post('/signin', userCtrl.signIn);
router.get('/', auth, userCtrl.getUser);

module.exports = router;