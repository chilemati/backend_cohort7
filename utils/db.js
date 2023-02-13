const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

async function connectDb(cb) {
	try {
		let res = await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connecton to Db was Successfull!");
		cb();
	} catch (error) {
		console.log("Sorry, an error occurred while connecting to Db");
	}
}

module.exports = {
	connectDb,
};
