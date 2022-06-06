const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
	},
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
			isAdmin: this.isAdmin,
		},
		process.env.ACCESS_TOKEN_SECRET
	);
};

userSchema.methods.excludePassword = function () {
	const { password: pass, __v, ...rest } = this._doc;
	return rest;
};

userSchema.pre('save', async function (next) {
	const user = this;

	const hash = await bcrypt.hashSync(this.password, 10);

	this.password = hash;
	next();
});

userSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compareSync(password, user.password);

	return compare;
};

exports.User = mongoose.model('User', userSchema);
