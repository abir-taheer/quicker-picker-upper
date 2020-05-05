const { expect, assert } = require('chai');
const genString = require('./../../utils/genString');

describe('genString', function () {
	it('should return a string', done => {
		const emptyStr = genString(0);
		const strLen10 = genString(10);

		expect(emptyStr).to.be.a('string');
		expect(strLen10).to.be.a('string');

		done();
	});

	it('should return a string of the correct length', done => {
		const strLen6 = genString(6);
		expect(strLen6).to.have.lengthOf(6);

		const emptyStr = genString(0);
		expect(emptyStr).to.have.lengthOf(0);

		const strLen99999 = genString(99999);
		expect(strLen99999).to.have.lengthOf(99999);

		done();
	});

	it('should only use the provided character set', done => {
		const singleCharCharsetStr = genString(5, 'a');

		// Since the charset only includes 'a'
		// Every character of the output should be an 'a'
		expect(singleCharCharsetStr).to.equal('aaaaa');

		const symbolCharset = '!@#$%^&*()';
		const symbolCharsetStr = genString(10, symbolCharset);

		// We're converting the string to an array so that we can use array iterating methods
		// Not necessary, but keeps code clean
		const symbolStrArray = symbolCharsetStr.split('');

		const everyCharIsInAllowedCharset = symbolStrArray.every(charStr =>
			symbolCharset.includes(charStr.charAt(0))
		);

		expect(everyCharIsInAllowedCharset).to.be.true;

		done();
	});

	it('should use an alphanumerical character set if one is not provided', done => {
		const alphaNumCharset = 'abcdefghijklmnopqrstuvwxyz1234567890';

		// Increases the likelihood of using each character at least once
		const testStrLength = alphaNumCharset.length * 5;

		for (let numTrials = 0; numTrials < 10; numTrials++) {
			const testStr = genString(testStrLength);

			const charArray = testStr.split('');

			const isAlphaNum = charArray.every(charStr => {
				const charCode = charStr.charCodeAt(0);
				return (
					// is lowercase letter
					(charCode > 96 && charCode < 123) ||
					// or is number
					(charCode > 47 && charCode < 58)
				);
			});

			expect(isAlphaNum).to.be.true;
		}

		done();
	});

	it('should throw an error for invalid length values', done => {
		const invalidLengthErrorMessage =
			'The length parameter expects a number greater than or equal to 0.';

		// We bind the parameter `length` to -1
		// The expect function calls our function with the bound parameters and catches the error
		expect(genString.bind(genString, -1)).to.throw(
			Error,
			invalidLengthErrorMessage
		);

		expect(genString.bind(genString, 'not-a-number')).to.throw(
			Error,
			invalidLengthErrorMessage
		);

		expect(genString.bind(genString, NaN)).to.throw(
			Error,
			invalidLengthErrorMessage
		);

		expect(genString.bind(genString, {})).to.throw(
			Error,
			invalidLengthErrorMessage
		);

		expect(genString.bind(genString, [])).to.throw(
			Error,
			invalidLengthErrorMessage
		);

		expect(genString.bind(genString, null)).to.throw(
			Error,
			invalidLengthErrorMessage
		);

		done();
	});

	it('should throw an error for invalid charset values', done => {
		const invalidCharsetErrorMessage =
			'The charset parameter expects a string of at least length 1.';

		expect(genString.bind(genString, 8, -1)).to.throw(
			Error,
			invalidCharsetErrorMessage
		);

		expect(genString.bind(genString, 8, NaN)).to.throw(
			Error,
			invalidCharsetErrorMessage
		);

		expect(genString.bind(genString, 8, {})).to.throw(
			Error,
			invalidCharsetErrorMessage
		);

		expect(genString.bind(genString, 8, [])).to.throw(
			Error,
			invalidCharsetErrorMessage
		);

		expect(genString.bind(genString, 8, null)).to.throw(
			Error,
			invalidCharsetErrorMessage
		);

		done();
	});
});
