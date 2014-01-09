"use strict";

var getLowerCharArray = function( str ) {
	return str.toLowerCase().split( "" );
};

var charArrayToString = function( arr ) {
	return arr.join( "" );
};

var partition = function( n, arr ) {
	var result = [];
	var length = arr.length;
	var i;

	for ( i = 0; i < length; i += n ) {
		result.push( arr.slice( i, i + n ) );
	}

	return result;
};

var rAlphaNum = /[a-z\d]/;
var regExTest = RegExp.prototype.test;

var normalize = function( text ) {
	return getLowerCharArray( text )
		.filter( regExTest, rAlphaNum );
};

var closestSquare = function( charArray ) {
	return Math.ceil( Math.sqrt( charArray.length ) );
};

var segment = function( charArray ) {
	return partition( closestSquare( charArray ), charArray );
};

var undefinedFilter = function( val ) {
	return val !== undefined;
};

var columnsToRowsFlattened = function( segmentedArray ) {
	return ( segmentedArray[ 0 ] || [] ).reduce( function( prev, _, index ) {
		return prev.concat(
			segmentedArray.map( function( val ) {
				return val[ index ];
			})
		);
	}, [] ).filter( undefinedFilter );
};

var getGroupIntoReduce = function( numInGroup ) {
	return function( resultStr, chr, index ) {
		return resultStr + ( index % numInGroup === 0 ? " " : "" ) + chr;
	};
};

var Crypto = function( text ) {
	this.plaintext = text;
};

Crypto.prototype.normalizePlaintext = function() {
	return charArrayToString( normalize( this.plaintext ) );
};

Crypto.prototype.size = function() {
	return closestSquare( normalize( this.plaintext ) );
};

Crypto.prototype.plaintextSegments = function() {
	return segment( normalize( this.plaintext ) )
		.map( charArrayToString );
};

Crypto.prototype.ciphertext = function() {
	return charArrayToString(
		columnsToRowsFlattened( segment( normalize( this.plaintext ) ) )
	);
};

Crypto.prototype.normalizeCiphertext = function() {
	return columnsToRowsFlattened( segment( normalize( this.plaintext ) ) )
			.reduce( getGroupIntoReduce( 5 ) );
};

module.exports = Crypto;
