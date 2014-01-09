"use strict";

var toCharArray = function( str ) {
	return str.split( "" );
};

var valueReducer = function( previousValue, currentValue, index ) {
	return previousValue + currentValue * Math.pow( this.base, index );
};

var sanitizeValue = function( val ) {
	return this.rValidValues.test( val ) ? val : this.defaultValue;
};

module.exports = {
	generate: function( base, rValidValues, defaultValue ) {
		var config = {
			base: base,
			rValidValues: rValidValues,
			defaultValue: defaultValue !== undefined ? defaultValue : "0"
		};

		var Nary = function( valueString ) {
			this.value = sanitizeValue.call( config, valueString );
		};

		Nary.prototype.toDecimal = function() {
			return toCharArray( this.value )
				.reverse()
				.reduce( valueReducer.bind( config ), 0 );
		};

		return Nary;
	}
};
