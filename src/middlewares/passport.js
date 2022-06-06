const passport = require('passport');
const userService = require('../services/user');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
	'login',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await userService.findUserByEmail({ email });

				if (!user) {
					return done(null, false, { message: 'User not found' });
				}

				const validate = await user.isValidPassword(password);

				if (!validate) {
					return done(null, false, { message: 'Wrong Password' });
				}

				return done(null, user, { message: 'Logged in Successfully' });
			} catch (error) {
				return done(error, false, { message: error.message });
			}
		}
	)
);

passport.use(
	new JWTstrategy(
		{
			secretOrKey: `${process.env.ACCESS_TOKEN_SECRET}`,
			jwtFromRequest: ExtractJWT.fromHeader('x-auth-token'),
		},
		(token, done) => {
			try {
				return done(null, token);
			} catch (error) {
				done(error, null, { message: error.message });
			}
		}
	)
);
