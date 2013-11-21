"use strict";

var isDivisibleBy = function( num, divisor ) {
	return num % divisor === 0;
};

var getDivisibleByPartial = function( num ) {
	return function( divisor ) {
		return isDivisibleBy( num, divisor );
	};
};

var Year = function( year ) {
	this.year = year;
};

Year.prototype.isLeapYear = function() {
	var yearIsDivibleBy = getDivisibleByPartial( this.year );

	return yearIsDivibleBy( 4 ) &&
		(
			!yearIsDivibleBy( 100 ) ||
			yearIsDivibleBy( 400 )
		);
};

module.exports = Year;
