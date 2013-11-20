"use strict";

var getRandomInt = function( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) + min );
};

var namePartGenerators = {
	digit: function() {
			return getRandomInt( 0, 9 );
		},
	letter: function() {

			// U+0041 is capital A
			var capitalACode = 0x41;

			// U+005A is capital Z
			var capitalZCode = 0x5A;

			return String.fromCharCode(
					getRandomInt( capitalACode, capitalZCode )
				);
		}
};

var namePattern = [
	{
		type: "letter",
		count: 2
	},
	{
		type: "digit",
		count: 3
	}
];
var generateName = function() {
	var nameArray = [];
	namePattern.forEach( function( section ) {
		var i;
		for ( i = 0; i < section.count; i++ ) {
			nameArray.push( namePartGenerators[ section.type ]() );
		}
	});
	return nameArray.join( "" );
};

var Robot = function() {
	this.name = generateName();
};

Robot.prototype.reset = function() {
	this.name = generateName();
};

module.exports = Robot;
