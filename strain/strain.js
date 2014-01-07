"use strict";

var filter = function( arr, predicateFn ) {
	var result = [];
	arr.forEach( function arrayIterator( value ) {
		if ( predicateFn.call( arr, value ) ) {
			result.push( value );
		}
	});
	return result;
};

module.exports = {
	keep: filter,
	discard: function( arr, predicateFn ) {
		return filter( arr, function predicateOpposite( value ) {
			return !predicateFn.call( this, value );
		});
	}
};
