"use strict";

var BASE = 2;
var VALID_VALUES = /^[10]+$/;
var DEFAULT_VALUE = "0";

var toCharArray = function( str ) {
	return str.split( "" );
};

var binaryReducer = function( previousValue, currentValue, index ) {
	return previousValue + currentValue * Math.pow( BASE, index );
};

var sanitizeValue = function( val ) {
	return VALID_VALUES.test( val ) ? val : DEFAULT_VALUE;
};

var Binary = function( binaryString ) {
	this.value = sanitizeValue( binaryString );
};

Binary.prototype.toDecimal = function() {
	return toCharArray( this.value ).reverse().reduce( binaryReducer, 0 );
};

module.exports = Binary;
