"use strict";

var generalToString = Object.prototype.toString;

var isFunction = function( obj ) {
	return generalToString.call( obj ).toLowerCase() === "[object function]";
};

var divideWithRemainder = function( num, divisor ) {
	return {
		quotient: num / divisor,
		remainder: num % divisor
	};
};

var factor = function( num, possibleFactor, factors ) {
	var newNum = num;
	var newPossibleFactor = possibleFactor;
	var divisionResults;

	if ( possibleFactor > num ) {
		return factors;
	}

	divisionResults = divideWithRemainder( num, possibleFactor );

	if ( divisionResults.remainder === 0 ) {
		factors.push( possibleFactor );
		newNum = divisionResults.quotient;
	}
	else {
		newPossibleFactor = possibleFactor + 1;
	}

	return function returnedFactorFunction() {
		return factor( newNum, newPossibleFactor, factors );
	};
};

module.exports = {
	for: function( num ) {
		var factorResult = factor( num, 2 , [] );
		while ( isFunction( factorResult ) ) {
			factorResult = factorResult();
		}
		return factorResult;
	}
};
