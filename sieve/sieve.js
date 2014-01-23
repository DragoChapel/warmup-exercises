"use strict";

/** Based on http://stackoverflow.com/a/10050831 */
var range = function( start, end ) {
	return Array.apply( null, { length: end - start + 1 } )
		.map( function( _, i ) {
			return i + start;
		});
};

var filterNonPrimes = function( possiblePrimes ) {
	if ( possiblePrimes.length === 0 ) {
		return [];
	}
	var nextPrime = possiblePrimes[ 0 ];
	return [ nextPrime ].concat(
		filterNonPrimes(
			possiblePrimes.filter( function( val ) {
				return val % nextPrime !== 0;
			})
		)
	);
};

var Sieve = function( upperLimit ) {
	this.primes = filterNonPrimes( range( 2, upperLimit ) );
};

module.exports = Sieve;
