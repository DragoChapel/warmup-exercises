"use strict";

var getRandomInteger = function( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) + min );
};

var getArrayOfLength = function( length ) {
	return Array.apply( null, { length: length } );
};

var letters = (function charactersGenerator( startCode, endCode ) {
	return getArrayOfLength( endCode - startCode + 1 )
		.map( function charactersGeneratorMapper( _, index ) {
			return String.fromCharCode( startCode + index );
		});

	// 0x61 === small letter A
	// 0x7A === small letter Z
})( 0x61, 0x7A );

var letterCount = letters.length;

var shiftAmounts = (function shiftAmountsGenerator( letters ) {
	var hash = {};
	letters.forEach( function letterIterator( letter, index ) {
		hash[ letter ] = index;
	});
	return hash;
})( letters );

var getRandomLetter = function() {
	return letters[ getRandomInteger( 0, letterCount ) ];
};

var getEncodeShift = function( chr, keyChr ) {
	return ( shiftAmounts[ chr ] + shiftAmounts[ keyChr ] ) % letterCount;
};

var getDecodeShift = function( chr, keyChr ) {
	return shiftAmounts[ chr ] - shiftAmounts[ keyChr ];
};

var getLetterShifter = function( key, shiftCalculator ) {
	return function letterShifter( chr, index ) {
		var shiftedIndex = shiftCalculator( chr, key[ index ] );
		return letters.slice( shiftedIndex, shiftedIndex + 1 );
	};
};

var getCoder = function( shiftCalculator ) {
	return function coder( str ) {
		return str.toLowerCase().split( "" )
			.map( getLetterShifter( this.key, shiftCalculator ) )
			.join( "" );
	};
};

var generateKey = function( keyLength ) {
	return getArrayOfLength( keyLength )
		.map( function() {
			return getRandomLetter();
		})
		.join( "" );
};

var rValidKey = /[a-z]+/;

var Cipher = function( key ) {
	key = key === undefined ? generateKey( 100 ) : key;
	if ( !rValidKey.test( key ) ) {
		throw new Error( "Bad key" );
	}
	this.key = key;
};

Cipher.prototype.encode = getCoder( getEncodeShift );

Cipher.prototype.decode = getCoder( getDecodeShift );

module.exports = Cipher;
