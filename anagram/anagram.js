"use strict";

var getLettersArray = function( word ) {
	return word.split( "" ).sort();
};

var arrayToString = function( array ) {
	return Array.prototype.toString.call( array );
};

var areArraysEqual = function( arrayOne, arrayTwo ) {
	return arrayToString( arrayOne ) === arrayToString( arrayTwo );
};

var Anagram = function( word ) {
	this.word = word;
};

Anagram.prototype.match = function( candidates ) {
	var lowerWord = this.word.toLowerCase();
	var letters = getLettersArray( lowerWord );

	return candidates.filter( function( candidate ) {
			var lowerCandidate = candidate.toLowerCase();
			var candidateLetters = getLettersArray( lowerCandidate );

			return areArraysEqual( letters, candidateLetters ) &&
					lowerCandidate !== lowerWord;
		}, this );
};

module.exports = Anagram;
