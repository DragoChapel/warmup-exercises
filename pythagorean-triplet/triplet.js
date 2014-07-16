"use strict";

var sum = function( a, b ) {
	return a + b;
};
var multiply = function( a, b ) {
	return a * b;
};
var square = function( n ) {
	return multiply( n, n );
};

var isValidTriple = function( triple, sum ) {
	return triple.isPythagorean()
		&& ( sum === undefined || triple.sum() === sum );
}

var indices = {
	a: 0,
	b: 1,
	c: 2
};

var Triplet = function( a, b, c ) {
	this.triple = [ a, b, c ];
};

Triplet.where = function( conditions ) {
	var min = conditions.minFactor || 1;
	var max = conditions.maxFactor;
	var sum = conditions.sum;
	var triples = [];
	var currentTriple;

	for ( var a = min; a < max - 1; a++ ) {
		for ( var b = a + 1; b < max; b++ ) {
			for ( var c = b + 1; c <= max; c++ ) {
				currentTriple = new Triplet( a, b, c );
				if ( isValidTriple( currentTriple, sum ) ) {
					triples.push( currentTriple );
				}
			}
		}
	}
	return triples;
};

Triplet.prototype.sum = function() {
	return this.triple.reduce( sum );
};

Triplet.prototype.product = function() {
	return this.triple.reduce( multiply );
};

Triplet.prototype.isPythagorean = function() {
	var a2PlusB2 = this.triple.slice( indices.a, indices.c )
		.map( square ).reduce( sum );
	return a2PlusB2 === square( this.triple[ indices.c ] );
};

module.exports = Triplet;
