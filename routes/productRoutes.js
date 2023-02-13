const express = require("express");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const { uploader } = require("../utils/cloudinary");
const Product = require("../model/productModel");
const { isValidObjectId } = require("mongoose");
let router = express.Router();

router.get("/", (req, res) => {
	res.status(200).json({ Home: "Home Page" });
});
router.get("/allproduct", (req, res) => {
	// res.status(200).json({ all: "Allproduct Page" });
	//? get all the product from db
	Product.find()
		.then((reply) => {
			//? send to front-end using json
			res.json(reply);
		})
		.catch((err) => {
			console.log(err);
		});
});
router.get("/singleproduct", (req, res) => {
	let { id } = req.body;
	if (isValidObjectId(id)) {
		Product.findById(id)
			.then((reply) => {
				res.json(reply);
			})
			.catch((err) => {
				console.log(err.message);
			});
	} else {
		res.json({ Error: `${id} is not a valid Mongodb Id` });
	}
});

router.post("/singleproduct", upload.single("prodImg"), async (req, res) => {
	if (req.file) {
		console.log("this req has a file");
		// console.log(req.file);
		//? mongodb schema requirement
		let { prodName, prodSnippet, prodDisc, prodPrice } = req.body;
		(prodImg_url = null), (prodImg_id = null);
		//? upload the image to cloudinary
		await cloudinary.uploader
			.upload(req.file.path, {
				folder: "Cohort7-Product",
			})
			.then((result) => {
				// ? extract the public_uri and image_id from cloudinary response
				console.log(result);
				prodImg_id = result.public_id;
				prodImg_url = result.secure_url;
			})
			.catch((err) => {
				console.log(err);
			});

		//? add the public_uri and image_id to meet our mongoDb schema requirement
		let toDb = {
			prodDisc,
			prodName,
			prodSnippet,
			prodPrice,
			prodImg_id,
			prodImg_url,
		};

		//? save to mongoDb
		let toMongo = new Product(toDb);

		toMongo
			.save()
			.then((reply) => {
				res.json(reply);
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		console.log("this req does not have a file");
	}
	// res.json({ created: "Single product Created" });
});

router.delete("/singleproduct", async (req, res) => {
	let { id } = req.body;
	//? get product to delete from db
	let reply = await Product.findById(id);
	//? delete from cloudinary using the public id found on our db
	let reply2 = await cloudinary.uploader.destroy(reply.prodImg_id);
	//? delete from db
	Product.findByIdAndDelete(id)
		.then((ans) => {
			//? success reply
			res.json(ans);
		})
		.catch((err) => {
			console.log(err);
		});
});

router.patch("/singleproduct", upload.single("prodImg"), async (req, res) => {
	let { id, prodPrice, prodName } = req.body;
	if (req.file) {
		//? get product to be update
		let oldProd = await Product.findById(id);
		//? delete from cloudinary using public_id
		let out = await cloudinary.uploader.destroy(oldProd.prodImg_id);
		//?  save new image to cloudianry
		let savedImg = await cloudinary.uploader.upload(req.file.path, {
			folder: "Cohort7-Product",
		});

		//? update db with public_id and url

		Product.findByIdAndUpdate(id, {
			$set: {
				prodImg_id: savedImg.public_id,
				prodImg_url: savedImg.secure_url,
				prodName: prodName,
			},
		})
			.then((reply) => {
				res.json({
					hasImage: true,
					update: `Product with id of ${id} was updated successfully!`,
				});
			})
			.catch((err) => {
				console.log(err.message);
			});

		//? end
	} else {
		Product.findByIdAndUpdate(id, { $set: { prodPrice: prodPrice } })
			.then((reply) => {
				res.json({
					hasImage: false,
					update: `Product with id of ${id} was updated successfully!`,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
});

router.get("*", (req, res) => {
	res.status(404).json({ Error: "Error Page" });
});

module.exports = {
	router,
};
