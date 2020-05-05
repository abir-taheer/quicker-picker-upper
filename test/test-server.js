const expect = require('chai').expect;
const request = require('request');
const app = require('./../app');

it('Does the server run without error', function (done) {
	let server;
	try {
		server = app.listen(process.env.PORT || 3001);
		done();
	} finally {
		server.close();
	}
});
