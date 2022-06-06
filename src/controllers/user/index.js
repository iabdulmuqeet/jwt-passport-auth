const userService = require('../../services/user');
const { promise } = require('../../middlewares/promise');
const passport = require('passport');

exports.register = promise(async (req, res) => {
	const { name, email, password, isAdmin } = req.body;

	const emailExists = await userService.findUserByEmail({ email });
	if (emailExists) return res.status(400).json({ message: 'Email already Exists' });

	const user = await userService.createUser({
		name,
		email,
		password,
		isAdmin,
	});

	const newUserObj = user.excludePassword();

	const token = user.generateAuthToken(newUserObj);

	res
		.status(200)
		.header('x-auth-token', token)
		.json({ message: 'Successfully created user', user: newUserObj });
});

exports.login = promise((req, res, next) => {
	passport.authenticate('login', (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(404).json({ message: info.message });

		const newUserObj = user.excludePassword();

		req.login(user, { session: false }, () => {
			const token = user.generateAuthToken(newUserObj);

			res.json({ user: newUserObj, token });
		});
	})(req, res, next);
});

exports.profile = promise(async (req, res) => {
	const user = await userService.findUserById({ id: req.user._id });

	const newUserObj = user.excludePassword();

	res.status(200).json({ user: newUserObj });
});
