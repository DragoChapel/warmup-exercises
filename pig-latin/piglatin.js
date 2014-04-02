"use strict";

var wordToCharArray = function( word ) {
	return word.split( "" );
};

var isVowel = function( letter ) {
	return /[aeiou]/i.test( letter );
};

var getShiftAmount = function( word ) {
	if ( isVowel( word[ 0 ] ) ) {
		return 0;
	}

	var multiLetterShift = "ch,qu,squ,thr,th,sch".split( "," ).reduce(
		function shiftReducer( curShift, seq ) {
			if ( curShift !== 0 ) {
				return curShift;
			}

			var startsWithSeq =
				word.slice( 0, seq.length ).toLowerCase() === seq;
			return startsWithSeq ? seq.length : 0;
		},
		0
	);

	return multiLetterShift || 1;
};

var getShifter = function( shiftAmount ) {
	return function shiftLeftWithWrap( _, index, arr ) {
		var nextIndex = ( index + shiftAmount ) % arr.length;
		return arr[ nextIndex ];
	};
};

var translateWord = function( word ) {
	var chars = wordToCharArray( word );
	var adjustedWord =
		chars.map( getShifter( getShiftAmount( word ) ) ).join( "" );

	return adjustedWord + "ay";
};

module.exports = {
	translate: function( phrase ) {
		return phrase.split( " " ).map( translateWord ).join( " " );
	}
};
