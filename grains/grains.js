"use strict";

var hasOwn = Object.prototype.hasOwnProperty;
var has = function( obj, key ) {
	return hasOwn.call( obj, key );
};

var memoizeOneArg = function( func ) {
	var previous = {};
	return function memoized( arg1 ) {
		if ( !has( previous, arg1 ) ) {
			previous[ arg1 ] = func.call( this, arg1 );
		}
		return previous[ arg1 ];
	};
};

var doubleSeries = function( num ) {
	return num === 1 ? 1 : 2 * doubleSeries( num - 1 );
};

var memoizedDoubleSeries = memoizeOneArg( doubleSeries );

var Grains = function() {};

Grains.prototype.square = function( num ) {
	return memoizedDoubleSeries( num );
};

Grains.prototype.total = function() {
	var MAX_SQUARES = 64;
	var sum = 0;
	var square;

	for ( square = MAX_SQUARES; square > 0; square-- ) {
		sum = sum + this.square( square );
	}

	return sum;
};

module.exports = Grains;
