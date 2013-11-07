"use strict";

var validNucleotides = [ "A", "C", "G", "T" ];

var hasProperty = function( obj, property ) {
	return Object.prototype.hasOwnProperty.call( obj, property );
};

var getCurrentCount = function( nucleotide, counts ) {
	return hasProperty( counts, nucleotide ) ? counts[ nucleotide ] : 0;
};

var countNucleotides = function( nucleotidesArray, defaultCounts ) {
	var counts = defaultCounts;
	nucleotidesArray.forEach( function( nucleotide ) {
		counts[ nucleotide ] = getCurrentCount( nucleotide, counts ) + 1;
	});
	return counts;
};

var nucleotideSequenceToArray = function( nucleotideSequence ) {
	return nucleotideSequence.split( "" );
};

var getDefaultCounts = function( validNucleotides ) {

	// TODO: This is too similar to `countNucleotides`
	var counts = {};
	validNucleotides.forEach( function( nucleotide ) {
		counts[ nucleotide ] = 0;
	});
	return counts;
};

var DNA = function( nucleotideSequence ) {
	this.nucleotideCounts = countNucleotides(
		nucleotideSequenceToArray( nucleotideSequence ),
		getDefaultCounts( validNucleotides )
	);
};

DNA.prototype.count = function( nucleotide ) {

	// TODO: Handle "U" somwhere
	return this.nucleotideCounts[ nucleotide ];
};

module.exports = DNA;
