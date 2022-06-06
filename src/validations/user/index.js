const yup = require('yup');

exports.registerSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().required(),
	isAdmin: yup.boolean().required(),
});

exports.loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});
