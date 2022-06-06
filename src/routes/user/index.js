const express = require('express');
const passport = require('passport');
const userController = require('../../controllers/user');
const { validation } = require('../../middlewares/validation');
const { registerSchema, loginSchema } = require('../../validations/user');

const router = express.Router();

router.post('/signup', validation(registerSchema), userController.register);
router.post('/login', validation(loginSchema), userController.login);
router.get(
	'/me',
	passport.authenticate('jwt', { session: false }),
	userController.profile
);

module.exports = router;
