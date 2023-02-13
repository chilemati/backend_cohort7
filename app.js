const express = require("express"); //* start server: step 1
const { router } = require("./routes/productRoutes");
const { connectDb } = require("./utils/db");
const app = express(); //* start server: step 2
const dotenv = require("dotenv").config();

//? middleware
app.use(express.json());
app.use(router);

//? routes

//? start server

connectDb(() => {
	//* start server step: 3
	app.listen(process.env.PORT || 4000, () => {
		console.log("Listening to request on port 4000");
	});
});
