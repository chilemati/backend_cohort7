// const { greeting, sum } = require("./module");

// let Names = "Amadi Chile";
// console.log(Names);

// let ages = [4, 5, 77, 120, 600];
// console.log(ages);
// console.log(ages[3]);
// console.log(greeting("Goodmorining Elitepath!"));
// console.log(sum(77, 88));

//? os module: operating system

// let os = require("os");
// console.log(os.platform());
// console.log(os.homedir());
// console.log(os.version());

//? fs module: file system
const fs = require("fs");
// create files and folders
fs.writeFile("./text.txt", "hello world", (err) => {
	console.log("file created and written");
});

// delete files
fs.unlink("./text.txt", (err) => {
	if (err) {
		console.log("file does not exist or path error");
	}
	console.log("file was deleted successfully!");
});

// read files
fs.readFile("./text2.txt", "utf-8", (err, data) => {
	if (err) {
		console.log("An error occured");
	}
	console.log(data);
});
