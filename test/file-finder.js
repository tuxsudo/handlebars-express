var assert = require('chai').assert,
	finder = require('../lib/file-grabber'),
	util = require('util');


describe('Finds and open files', function() {

	it('locates and open files via array of globs', function(done) {

		finder(['*/partials/**/*.hbs', '*/partials/**/*.handlebars'])
			.then( function(data) {
				assert.isArray(data);
				assert.strictEqual(3, data.length);
				assert.deepEqual(Object.keys(data[0]), [ 'path', 'ext', 'base', 'contents' ]);
			})

			.then( done )

			.catch( done );
	});


	it('locates and open files via a string glob', function(done) {

		finder('*/helpers/**/*.js')
			.then( function(data) {
				assert.isArray(data);
				assert.deepEqual(Object.keys(data[0]), ['path', 'ext', 'base', 'contents' ]);
			})

			.then( done )

			.catch( done );
	});


});
