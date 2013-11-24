"use strict";

var DAYS_IN_WEEK = 7;

var daysToNextDayOfWeek = function( dayOfWeek, desiredDayOfWeek ) {
	return ( desiredDayOfWeek - dayOfWeek + DAYS_IN_WEEK ) % DAYS_IN_WEEK;
};

var daysToPreviousDayOfWeek = function( dayOfWeek, desiredDayOfWeek ) {
	return ( dayOfWeek - desiredDayOfWeek + DAYS_IN_WEEK ) % DAYS_IN_WEEK;
};

var getFirstDayOfMonth = function( month, year ) {
	return new Date( year, month, 1 );
};

var getLastDayOfMonth = function( month, year ) {
	return new Date( year, month + 1, 0 );
};

var FIRST_TEENTH_DAY = 13;

var getFirstTeenthInMonth = function( month, year ) {
	return new Date( year, month, FIRST_TEENTH_DAY );
};

var getDayTeenth = function( firstTeenth, dayOfWeek ) {
	return new Date(
		firstTeenth.setDate(
			firstTeenth.getDate() +
				daysToNextDayOfWeek( firstTeenth.getDay(), dayOfWeek )
		)
	);
};

var getOrdinalDayOfWeek = function(
			firstDayOfMonth,
			dayOfWeek,
			ordinalIndex
		) {
	return new Date(
		firstDayOfMonth.setDate(
			firstDayOfMonth.getDate() +
				( ordinalIndex * DAYS_IN_WEEK ) +
				daysToNextDayOfWeek( firstDayOfMonth.getDay(), dayOfWeek )
		)
	);
};

var getLastDayOfWeek = function( lastDayOfMonth, dayOfWeek ) {
	return new Date(
		lastDayOfMonth.setDate(
			lastDayOfMonth.getDate() -
				daysToPreviousDayOfWeek( lastDayOfMonth.getDay(), dayOfWeek )
		)
	);
};

var getTeenthFunction = function( dayOfWeek ) {
	return function() {
			return getDayTeenth(
				getFirstTeenthInMonth( this.month, this.year ),
				dayOfWeek
			);
		};
};

var getLastDayFunction = function( dayOfWeek ) {
	return function() {
		return getLastDayOfWeek(
			getLastDayOfMonth( this.month, this.year ),
			dayOfWeek
		);
	};
};

var Meetup = function( month, year ) {
	this.month = month;
	this.year = year;
};

var dayOrdinals = [ "first", "second", "third", "fourth" ];

var populateOridinalFunctions = function(
			obj,
			ordinal,
			dayName,
			dayIndex,
			ordinalIndex
		) {
	obj.prototype[ ordinal + dayName ] = function() {
		return getOrdinalDayOfWeek(
				getFirstDayOfMonth( this.month, this.year ),
				dayIndex,
				ordinalIndex
			);
	};
};

var getOridinalFunctionPopulator = function( obj, dayOfWeekInfo, dayIndex ) {
	return function orginalFunctionPopulator( ordinal, ordinalIndex ) {
		populateOridinalFunctions(
			obj,
			ordinal,
			dayOfWeekInfo.dayName,
			dayIndex,
			ordinalIndex
		);
	};
};

var populateInstanceMethods = function( obj, dayOfWeekInfo, dayIndex ) {
	obj.prototype[ dayOfWeekInfo.teenthDay ] = getTeenthFunction( dayIndex );
	dayOrdinals.forEach(
		getOridinalFunctionPopulator( obj, dayOfWeekInfo, dayIndex )
	);
	obj.prototype[ "last" + dayOfWeekInfo.dayName ] =
		getLastDayFunction( dayIndex );
};

var getInstanceMethodPopulator = function( obj ) {
	return function instanceMethodPopulator( dayOfWeekInfo, dayIndex ) {
		populateInstanceMethods( obj, dayOfWeekInfo, dayIndex );
	};
};

// `Date#getDay()` returns 0 for Sunday, so this array must start with Sunday
[
	{
		dayName: "Sunday",
		teenthDay: "sunteenth"
	},
	{
		dayName: "Monday",
		teenthDay: "monteenth"
	},
	{
		dayName: "Tuesday",
		teenthDay: "tuesteenth"
	},
	{
		dayName: "Wednesday",
		teenthDay: "wednesteenth"
	},
	{
		dayName: "Thursday",
		teenthDay: "thursteenth"
	},
	{
		dayName: "Friday",
		teenthDay: "friteenth"
	},
	{
		dayName: "Saturday",
		teenthDay: "saturteenth"
	}
]
	.forEach( getInstanceMethodPopulator( Meetup ) );

module.exports = Meetup;
