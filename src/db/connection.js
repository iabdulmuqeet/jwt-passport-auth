const mongoose = require('mongoose');

const DEV_MONGO_URI = `mongodb://localhost:27017/${process.env.DB_NAME}`;

const PROD_MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_UN}:${process.env.MONGO_DB_PW}@cluster0.bqu75.mongodb.net/${process.env.DB_NAME}`;

const MONGO_URI =
	process.env.NODE_ENV === 'production' ? PROD_MONGO_URI : DEV_MONGO_URI;

exports.dbConnect = () => {
	try {
		console.log('Waiting for db to connect...');
		mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('DB is connected!');
	} catch (error) {
		console.clear();
		console.error(`Some error while connection to db ${error}`);
	}
};
