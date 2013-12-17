"use strict";

var numeralsToDataMapping = {
	"M": {
		value: 1000
	},
	"D": {
		value: 500
	},
	"C": {
		value: 100,
		suffixes: [ "M", "D" ]
	},
	"L": {
		value: 50
	},
	"X": {
		value: 10,
		suffixes: [ "C", "L" ]
	},
	"V": {
		value: 5
	},
	"I": {
		value: 1,
		suffixes: [ "X", "V" ]
	}
};

var getNumeralArrayData = function( numeral, dataMapping ) {
	var numeralData = dataMapping[ numeral ];
	return [
		{
			numeral: numeral,
			value: numeralData.value
		}
	].concat(
		( numeralData.suffixes || [] ).map( function suffixMapper( suffix ) {
			return {
				numeral: numeral + suffix,
				value: dataMapping[ suffix ].value - numeralData.value
			};
		})
	);
};

var numeralDataDescendingSorter = function( dataOne, dataTwo ) {
	return dataTwo.value - dataOne.value;
};

var orderedNumerals = (function numeralOrderer( dataMapping ) {
	return Object.keys( dataMapping ).reduce(
		function numeralReducer( numeralsArray, numeral ) {
			return numeralsArray.concat(
				getNumeralArrayData( numeral, dataMapping )
			);
		},
		[]
	).sort( numeralDataDescendingSorter );
})( numeralsToDataMapping );

var repeatString = function( str, count ) {
	return count > 0 ? new Array( count + 1 ).join( str ) : "";
};

var getNumeralCount = function( num, numeralValue ) {
	return Math.floor( num / numeralValue );
};

module.exports = {
	toRoman: function( num ) {
		var remaining = num;
		return orderedNumerals.map( function numeralMapper( numeralInfo ) {
			var numeralCount = getNumeralCount( remaining, numeralInfo.value );
			remaining = remaining - numeralInfo.value * numeralCount;
			return repeatString( numeralInfo.numeral, numeralCount );
		}).join( "" );
	}
};
