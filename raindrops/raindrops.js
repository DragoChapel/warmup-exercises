"use strict";

var primefactors = require( "../prime-factors/primefactors" );

var ensureString = function( val ) {
	return "" + val;
};

var factorsToDropWords = {
	"3": "Pling",
	"5": "Plang",
	"7": "Plong"
};

var convertToDropWord = function( factor ) {
	return factorsToDropWords[ factor ] || "";
};

var raindropReducer = function( previous, current ) {
	return previous + convertToDropWord( current );
};

var hasOwn = Object.prototype.hasOwnProperty;
var getDuplicateFilter = function() {
	var seen = {};
	return function duplicateFilter( val ) {
		var isDupe = hasOwn.call( seen, val );
		seen[ val ] = true;
		return !isDupe;
	};
};

var Raindrops = function() {};

Raindrops.prototype.convert = function( num ) {
	var dropWords = primefactors.for( num )
		.filter( getDuplicateFilter() )
		.reduce( raindropReducer, "" );
	return dropWords || ensureString( num );
};

module.exports = Raindrops;
