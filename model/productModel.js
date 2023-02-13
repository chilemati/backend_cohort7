const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		prodName: {
			type: String,
			required: [true, "Please provide a product name"],
		},
		prodSnippet: {
			type: String,
			required: [true, "Please provide a brief intro of product"],
		},
		prodDisc: {
			type: String,
			required: [true, "please include product full discription"],
		},
		prodPrice: {
			type: Number,
			required: [true, "Product price must be of number type"],
		},
		prodImg_url: {
			type: String,
			required: [true, "Please provide image cloudinary url"],
		},
		prodImg_id: {
			type: String,
			required: [true, "Please provide image cloudinary id"],
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Cohort7_Product", productSchema);

module.exports = Product;
