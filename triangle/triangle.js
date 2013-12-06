"use strict";

var duplicateArray = function( arr ) {
	return arr.concat();
};

var getSortedCopy = function( arr ) {
	return duplicateArray( arr ).sort();
};

var isEveryValueEqualTo = function( arr, value ) {
	return arr.every( function equalCheck( arrValue ) {
		return arrValue === value;
	});
};

var noSize = {
	name: "no size",
	test: function noSizeTest( dimensions ) {
		if ( isEveryValueEqualTo( dimensions, 0 ) ) {
			throw new Error( "A triangle with no size is illegal." );
		}
	}
}

var illegalNegative = {
	name: "illegal",
	test: function illegalNegativeTest( dimensions ) {
		return dimensions.some( function negativeCheck( dimension ) {
			return dimension <= 0;
		});
	}
};

var illegalInequality = {
	name: "illegal",
	test: function illegalInequalityTest( dimensions ) {

		// Reverse the array to get it sorted high to low
		// so we can use `pop` to get the values instead of `shift`.
		var sorted = getSortedCopy( dimensions ).reverse();
		return sorted.pop() + sorted.pop() <= sorted.pop();
	}
};

var equilateral = {
	name: "equilateral",
	test: function equilateralTest( dimensions ) {
		return isEveryValueEqualTo( dimensions, dimensions[ 0 ] );
	}
};

var isosceles = {
	name: "isosceles",
	test: function isoscelesTest( dimensions ) {
		var sorted = getSortedCopy( dimensions );
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

var kinds = [
	noSize,
	illegalNegative,
	illegalInequality,
	equilateral,
	isosceles,
	scalene
];

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
