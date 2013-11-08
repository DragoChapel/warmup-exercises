"use strict";

var NucleotideHandler = function( config ) {
	this.symbols = config.symbols;
	this.matches = config.matchesFunc;
	this.add = config.add;
	this.getCount = config.getCount;
};

var symbolMatcher = function( nucleotide ) {
	return this.symbols.indexOf( nucleotide ) > -1;
};

var uracilHandler = new NucleotideHandler({
	symbols: [ "U" ],
	matchesFunc: symbolMatcher,
	add: function noop() {},
	getCount: function() {
		return 0;
	}
});

var dnaNucleotideHandler = new NucleotideHandler({
	symbols: [ "A", "C", "G", "T" ],
	matchesFunc: symbolMatcher,
	add: function( nucleotide, counts ) {
		counts[ nucleotide ] = counts[ nucleotide ] + 1;
	},
	getCount: function( nucleotide, counts ) {
		return counts[ nucleotide ];
	}
});

var throwInvalid = function() {
	throw new Error( "Invalid Nucleotide" );
};

var invalidHandler = new NucleotideHandler({
	symbols: [],
	matchesFunc: function() {
		return true;
	},
	add: throwInvalid,
	getCount: throwInvalid
});

var nucleotideHandlers = [
	dnaNucleotideHandler,
	uracilHandler,
	invalidHandler
];

var countNucleotides = function( nucleotidesArray, defaultCounts ) {
	var counts = defaultCounts;
	nucleotidesArray.forEach( function( nucleotide ) {
		nucleotideHandlers.some( function( handler ) {
			if ( handler.matches( nucleotide ) ) {
				handler.add( nucleotide, counts );
				return true;
			}
		});
	});
	return counts;
};

var getDefaultCounts = function( validNucleotides ) {
	var counts = {};
	validNucleotides.forEach( function( nucleotide ) {
		counts[ nucleotide ] = 0;
	});
	return counts;
};

var nucleotideSequenceToArray = function( nucleotideSequence ) {
	return nucleotideSequence.split( "" );
};

var DNA = function( nucleotideSequence ) {
	this.nucleotideCounts = countNucleotides(
		nucleotideSequenceToArray( nucleotideSequence ),
		getDefaultCounts( dnaNucleotideHandler.symbols )
	);
};

DNA.prototype.count = function( nucleotide ) {
	var count = 0;
	nucleotideHandlers.some( function( handler ) {
		if ( handler.matches( nucleotide ) ) {
			count = handler.getCount( nucleotide, this.nucleotideCounts );
			return true;
		}
	}.bind( this ) );
	return count;
};

module.exports = DNA;
