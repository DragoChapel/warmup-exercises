"use strict";

var hasProperty = function( obj, property ) {
	return Object.prototype.hasOwnProperty.call( obj, property );
};

var getCurrentCount = function( word, count ) {
	return hasProperty( count, word ) ? count[ word ] : 0;
};

var normalizeWord = function( word ) {
	return word.toLowerCase();
};

var Words = function( input ) {
	var count = {};
	input.split( /[^\w]+/ ).forEach( function( word ) {
		word = normalizeWord( word );
		if ( word.length === 0 ) {
			return;
		}
		count[ word ] = getCurrentCount( word, count ) + 1;
	});

	this.count = count;
};

module.exports = Words;
