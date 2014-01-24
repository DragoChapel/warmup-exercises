"use strict";

var getRandomInteger = function( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) + min );
};

var getRandomLetter = function() {
	var SMALL_LETTER_A = 0x61;
	var SMALL_LETTER_Z = 0x7A;

	return String.fromCharCode(
		getRandomInteger( SMALL_LETTER_A, SMALL_LETTER_Z )
	);
};

var generateKey = function( keyLength ) {
	return Array.apply( null, { length: keyLength } )
		.map( function() {
			return getRandomLetter();
		})
		.join( "" );
};

var Cipher = function() {
	this.key = generateKey( 100 );
};

Cipher.prototype.encode = function( str ) {
	return;
};

module.exports = Cipher;
