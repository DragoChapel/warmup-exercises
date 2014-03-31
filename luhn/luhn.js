"use strict";

var toInt = function( numStr ) {
	return parseInt( numStr, 10 );
};

var toDigitsArray = function( num ) {
	return num.toString().split( "" ).map( toInt );
};

var isEven = function( num ) {
	return num % 2 === 0;
};

var isOdd = function( num ) {
	return !isEven( num );
};

var isMultipleOfTen = function( num ) {
	return num % 10 === 0;
};

var fixBigNumbers = function( digit ) {
	return digit > 10 ? ( digit - 9 ) : digit;
};

var sum = function( currentSum, num ) {
	return currentSum + num;
};

var getDistanceToNextMultipleOfTen = function( num ) {
	return 10 - ( num % 10 );
};

var Luhn = function( num ) {
	var digitsArray = toDigitsArray( num );
	var doublerCheck = isEven( digitsArray.length ) ? isEven : isOdd;

	this.checkDigit = digitsArray[ digitsArray.length - 1 ];
	this.addends = digitsArray.map( function doubleTheDigits( digit, index ) {
		return doublerCheck( index ) ? ( digit * 2 ) : digit;
	})
		.map( fixBigNumbers );
	this.checksum = this.addends.reduce( sum );
	this.valid = isMultipleOfTen( this.checksum );
};

Luhn.create = function( partialNum ) {

	// Try a zero as the check digit
	var initialTry = partialNum * 10;
	var luhnObj = new Luhn( initialTry );
	var distance = getDistanceToNextMultipleOfTen( luhnObj.checksum );

	return luhnObj.valid ? initialTry : ( initialTry + distance );
};

module.exports = Luhn;
