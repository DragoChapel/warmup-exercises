"use strict";

var toCharArray = function( str ) {
	str = str || "";
	return str.split( "" );
};

var toInt = function( value ) {
	return parseInt( value, 10 );
};

var createLetterToPointsMapping = function( pointsObj ) {
	var letterToPointsMapping = {};
	Object.keys( pointsObj ).forEach( function pointsLoop( pointsStr ) {
		var letters = pointsObj[ pointsStr ];
		var points = toInt( pointsStr );
		toCharArray( letters ).forEach( function lettersLoop( letter ) {
			letterToPointsMapping[ letter ] = points;
		});
	});
	return letterToPointsMapping;
};

var points = {
	1: "aeioulnrst",
	2: "dg",
	3: "bcmp",
	4: "fhvwy",
	5: "k",
	8: "jx",
	10: "qz"
};

var letterToPointsMapping = createLetterToPointsMapping( points );

var pointsLookup = function( letter, letterToPointsMapping ) {
	return letterToPointsMapping[ letter.toLowerCase() ];
};

var letterToPoints = function( letter ) {
	return pointsLookup( letter, letterToPointsMapping );
};

var addValues = function( first, second ) {
	return first + second;
};

var Scrabble = {};

Scrabble.score = function( word ) {
	return toCharArray( word ).map( letterToPoints ).reduce( addValues, 0 );
};

module.exports = Scrabble;
