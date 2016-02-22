'use strict';
const fs = require('fs');
const EasyZip = require('easy-zip').EasyZip;
const path = require('path');
const fileMakerController = {

	// creates a file matching the current state of the code on the homepage
	createsFile(req, res, next) {
		console.log("test");
		fs.writeFile(path.join(__dirname, 'gulp-starter.js'), req.body, (err) => {
			if (err) throw err;
			next();
		});
	},

	// zips the file that was just created and sends it back to the user
	zipsFile(req, res, next) {
		const zip = new EasyZip();

		zip.addFile('gulp-starter.js', path.join(__dirname, 'gulp-starter.js'), () => {
			zip.addFile('docs.md', path.join(__dirname, './../docs/docs.md'), () => {
				zip.addFile('package.json', path.join(__dirname, './../pkgjson/package.json'),() => {
					zip.writeToFile(path.join(__dirname, 'chuggFile.zip'), () => {

						// this next line is probably not needed but we are in a crunch and it is working
						zip.writeToResponse(res,'chuggFile');

						res.end();
					});
				});
			});
		});
	},
};

module.exports = fileMakerController;
