"use strict";

var dnaToRnaMap = {
	"T": "U"
};

var dnaToRnaMapper = function( nucleotide ) {
	return dnaToRnaMap[ nucleotide ] || nucleotide;
};

var DNA = function( nucleotideSequence ) {
	this.nucleotideSequence = nucleotideSequence;
};

DNA.prototype.toRNA = function() {
	return this.nucleotideSequence.split( "" )
		.map( dnaToRnaMapper )
		.join( "" );
};

module.exports = DNA;
