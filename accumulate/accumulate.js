"use strict";

var accumulate = function( accumulator ) {
	var accumulated = [];
	this.forEach( function( val ) {
		accumulated.push( accumulator.call( this, val ) );
	}.bind( this ) );
	return accumulated;
};

if ( !Array.prototype.accumulate ) {
	Array.prototype.accumulate = accumulate;
}
