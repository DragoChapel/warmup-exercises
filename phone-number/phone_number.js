"use strict";

var rAllNonNumbers = /[^\d]+/g;
var removeNonNumbers = function( phoneNumber ) {
	return phoneNumber.replace( rAllNonNumbers, "" );
};

var defaultDigits = "0000000000";
var rDigits = /^1?([\d]{10})$/;
var getDigits = function( phoneNumber ) {
	var digits = defaultDigits;
	var result = rDigits.exec( removeNonNumbers( phoneNumber ) );
	if ( result !== null ) {
		digits = result[ 1 ];
	}
	return digits;
};

var getAreaCode = function( digits ) {
	return digits.substr( 0, 3 );
};

var getSubscriberNumber = function( digits ) {
	return digits.substr( 3 );
};

var formatAreaCode = function( digits ) {
	return "(" + getAreaCode( digits ) + ")";
};

var formatSubscriberNumber = function( digits ) {
	var whole = getSubscriberNumber( digits );
	return whole.substr( 0, 3 ) + "-" + whole.substr( 3 );
};

var formatDigits = function( digits ) {
	return formatAreaCode( digits ) + " " + formatSubscriberNumber( digits );
};

var Phone = function( phoneNumber ) {
	this.phoneNumber = phoneNumber;
};

Phone.prototype.number = function() {
	return getDigits( this.phoneNumber );
};

Phone.prototype.areaCode = function() {
	return getAreaCode( getDigits( this.phoneNumber ) );
};

Phone.prototype.toString = function() {
	return formatDigits( getDigits( this.phoneNumber ) );
};

module.exports = Phone;
