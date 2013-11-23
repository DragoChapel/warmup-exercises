"use strict";

var DAYS_IN_WEEK = 7;

var daysToNextDayOfWeek = function( dayOfWeek, desiredDayOfWeek ) {
	return ( desiredDayOfWeek - dayOfWeek + DAYS_IN_WEEK ) % DAYS_IN_WEEK;
};

var getFirstTeenthInMonth = function( month, year ) {
	return new Date( year, month, 13 );
};

var getDayTeenth = function( firstTeenth, day ) {
	return new Date(
		firstTeenth.setDate(
			firstTeenth.getDate() +
				daysToNextDayOfWeek( firstTeenth.getDay(), day )
		)
	);
};

var Meetup = function( month, year ) {
	this.month = month;
	this.year = year;
};

// `Date#getDay()` returns 0 for Sunday, so start with Sunday
"sunteenth,monteenth,tuesteenth,wednesteenth,thursteenth,friteenth,saturteenth"
	.split( "," )
	.forEach( function( funcName, index ) {
		Meetup.prototype[ funcName ] = function() {
			return getDayTeenth(
				getFirstTeenthInMonth( this.month, this.year ),
				index
			);
		};
	});

module.exports = Meetup;
