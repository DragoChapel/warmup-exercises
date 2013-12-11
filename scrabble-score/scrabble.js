"use strict";

var toCharArray = function( str ) {
	str = str || "";
	return str.split( "" );
};

var createPointsObject = function( pointValue, letters ) {
	return {
		points: pointValue,
		letters: toCharArray( letters )
	};
};

var createLetterToPointsMapping = function( pointsData ) {
	var letterToPointsMapping = {};
	pointsData.forEach( function pointsLoop( pointsObj ) {
		var letters = pointsObj.letters;
		var points = pointsObj.points;
		letters.forEach( function lettersLoop( letter ) {
			letterToPointsMapping[ letter ] = points;
		});
	});
	return letterToPointsMapping;
};

var pointsData = [
	createPointsObject( 1, "aeioulnrst" ),
	createPointsObject( 2, "dg" ),
	createPointsObject( 3, "bcmp" ),
	createPointsObject( 4, "fhvwy" ),
	createPointsObject( 5, "k" ),
	createPointsObject( 8, "jx" ),
	createPointsObject( 10, "qz" )
];

var letterToPointsMapping = createLetterToPointsMapping( pointsData );

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
