"use strict";

var validNucleotides = [ "A", "C", "G", "T" ];

var defaultCounts = (function( validNucleotides ) {
	var counts = {};
	validNucleotides.forEach( function( nucleotide ) {
		counts[ nucleotide ] = 0;
	});
	return counts;
})( validNucleotides );

var DNA = function( nucleotideSequence ) {
	this.nucleotideCounts = defaultCounts;
};

DNA.prototype.count = function( nucleotide ) {
	return this.nucleotideCounts[ nucleotide ];
};

module.exports = DNA;
