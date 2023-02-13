const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "/tmp/my-uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});

const upload = multer({
	storage: storage,
	limits: 3 * (1024 * 1024), //? this means accept files less than 3mb
	fileFilter: function fileFilter(req, file, cb) {
		// The function should call `cb` with a boolean

		// to indicate if the file should be accepted

		if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
			// To accept the file pass `true`, like so:
			console.log("file type accepted");
			cb(null, true);
		} else {
			// To reject this file pass `false`, like so:
			cb(null, false);

			// You can always pass an error if something goes wrong:
			cb(new Error(`I accept only jpeg and png not ${file.mimetype}`));
		}

		// console.log("the file type is: ", file.mimetype);
		// console.log("the file type is: ", file);
	},
});

module.exports = upload;
