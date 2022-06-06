require('dotenv').config();
const app = require('./src/app');
const { dbConnect } = require('./src/db/connection');

dbConnect();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	// console.clear();
	console.log(`Server started listenng on http://localhost:${PORT}`);
});
