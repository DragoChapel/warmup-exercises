"use strict";

var hasProperty = function( obj, property ) {
	return Object.prototype.hasOwnProperty.call( obj, property );
};

var Words = function( input ) {
	var count = {};
	input.split( " " ).forEach( function( word ) {
		var currentCount = hasProperty( count, word ) ? count[ word ] : 0;
		count[ word ] = currentCount + 1;
	});

	this.count = count;
};

module.exports = Words;
