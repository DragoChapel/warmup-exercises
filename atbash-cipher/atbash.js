"use strict";

var charCode = function( chr ) {
	return chr.charCodeAt( 0 );
};

var END_CODE = charCode( "z" );
var START_CODE = charCode( "a" );
var END_CODE_PLUS_START_CODE = END_CODE + START_CODE;

var getOppositeCode = function( chr ) {
	var code = charCode( chr )
	return code >= START_CODE ? END_CODE_PLUS_START_CODE - code : code;
};

var getOppositeChar = function( chr ) {
	return String.fromCharCode( getOppositeCode( chr ) );
};

var stringToCharArray = function( str ) {
	return str.split( "" );
};

var getGroupIntoReduce = function( numInGroup ) {
	return function( resultStr, chr, index ) {
		return resultStr + ( index % numInGroup === 0 ? " " : "" ) + chr;
	};
};

var rAlphaNum = /[a-z\d]/;
var regExTest = RegExp.prototype.test;

module.exports = {
	encode: function( text ) {
		return stringToCharArray( text.toLowerCase() )
			.filter( regExTest, rAlphaNum )
			.map( getOppositeChar )
			.reduce( getGroupIntoReduce( 5 ) );
	}
};
