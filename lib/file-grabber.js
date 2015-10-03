var Promise = global.Promise || require('es6-promise').Promise,
	promisify = require('promisify-node-callback'),
	fs = require('fs'),
	path = require('path'),
	glob = require('globby'),
	readFile = promisify(fs.readFile.bind( fs )),
	R = require('ramda');





// transform a filename to an object with filename, basename, etc
function fileSpecs(pathString) {

	return {
		path: pathString,
		ext: path.extname(pathString),
		base: path.basename(pathString, path.extname(pathString))
	};

}


// transform object describing a file
// into an object-promise describing a file + its contents.
function appendFileContents(filespecs) {

	return readFile( filespecs.path )
		.then( function(buffer) {
			return R.mergeAll([ {}, filespecs, { contents: buffer.toString() }]);
		});

}


module.exports = function(globPatterns) {

	return glob(globPatterns)
		.then(function(files){
			return Promise.all(files.map(fileSpecs).map(appendFileContents) );
		});

};
