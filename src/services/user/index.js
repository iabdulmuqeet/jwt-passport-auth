const { User } = require('../../db/models/user');

exports.findUserByEmail = async ({ email }) => {
	try {
		const user = await User.findOne({ email });
		return user;
	} catch (err) {
		throw new Error(err);
	}
};

exports.findUserById = async ({ id }) => {
	try {
		const user = await User.findById({ _id: id });
		return user;
	} catch (err) {
		throw new Error(err);
	}
};

exports.createUser = async ({ name, email, password, isAdmin }) => {
	try {
		const user = new User({
			name,
			email,
			password,
			isAdmin,
		});

		await user.save();
		return user;
	} catch (err) {
		throw new Error(err);
	}
};
