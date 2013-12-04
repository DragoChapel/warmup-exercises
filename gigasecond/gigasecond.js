"use strict";

var duplicateDate = function( date ) {
	return new Date( date.toISOString() );
};

var getDateWithoutTime = function( date ) {
	return new Date( date.toDateString() );
};

var getGigaSeconds = function( date ) {
	var GIGA_SECONDS = 1e9;
	return date.getSeconds() + GIGA_SECONDS;
};

var Gigasecond = function( startDate ) {
	this.startDate = startDate;
};

Gigasecond.prototype.date = function() {
	var newDate = duplicateDate( this.startDate );
	newDate.setSeconds( getGigaSeconds( newDate ) );
	return getDateWithoutTime( newDate );
};

module.exports = Gigasecond;
