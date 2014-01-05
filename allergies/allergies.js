"use strict";

var allergens = [
	"eggs",
	"peanuts",
	"shellfish",
	"strawberries",
	"tomatoes",
	"chocolate",
	"pollen",
	"cats"
];

var allergenValuesMap = (function allergenValuesMapGenerator( allergens ) {
	var values = {};
	allergens.forEach( function allergenValuesIterator( allergen, index ) {
		values[ allergen ] = Math.pow( 2, index );
	});
	return values;
})( allergens );

var isAllergyIndicated = function( allergen, score ) {
	var allergenValue = allergenValuesMap[ allergen ];
	return ( score & allergenValue ) === allergenValue;
};

var Allergies = function( score ) {
	this.score = score;
};

Allergies.prototype.list = function() {
	return allergens.filter( function allergensListFilter( allergen ) {
		return isAllergyIndicated( allergen, this.score );
	}.bind( this ));
};

Allergies.prototype.allergicTo = function( allergen ) {
	return isAllergyIndicated( allergen, this.score );
};

module.exports = Allergies;
