/**
 * genString
 * Generates a random string of a certain length from a given character set
 * @param  {Number} length - The length of the string
 * @param  {String} charset - The characters allowed in the random string
 * @return {String}
 */

const genString = (
	length,
	charset = 'abcdefghijklmnopqrstuvwxyz1234567890'
) => {
	if (typeof charset !== 'string' || charset.length === 0) {
		throw new Error(
			'The charset parameter expects a string of at least length 1.'
		);
	}

	if (typeof length !== 'number' || isNaN(length) || length < 0) {
		throw new Error(
			'The length parameter expects a number greater than or equal to 0.'
		);
	}

	let str = '';

	while (str.length < length) {
		const randomCharIndex = Math.floor(Math.random() * charset.length);

		str += charset.charAt(randomCharIndex);
	}

	return str;
};

module.exports = genString;
