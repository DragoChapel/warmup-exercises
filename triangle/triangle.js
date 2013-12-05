"use strict";

var duplicateArray = function( arr ) {
	return arr.concat();
};

var equilateral = {
	name: "equilateral",
	test: function equilateralTest( dimensions ) {
		var standard = dimensions[ 0 ];
		return dimensions.every( function equalCheck( dimension ) {
			return dimension === standard;
		});
	}
};

var isosceles = {
	name: "isosceles",
	test: function isoscelesTest( dimensions ) {
		var sorted = duplicateArray( dimensions ).sort();
		var standard = sorted[ 1 ];
		return sorted[ 0 ] === standard || sorted.reverse()[ 0 ] == standard;
	}
};

var scalene = {
	name: "scalene",
	test: function scaleneTest() {
		return true;
	}
};

var kinds = [ equilateral, isosceles, scalene ];

var Triangle = function( sideOne, sideTwo, sideThree ) {
	this.dimensions = [ sideOne, sideTwo, sideThree ];
};

Triangle.prototype.kind = function() {
	var kindName;

	kinds.some( function kindLoop( kind ) {
		kindName = kind.name;
		return kind.test( this.dimensions );
	}.bind( this ) );

	return kindName;
};

module.exports = Triangle;
