"use strict";

var convertItemName = function( item ) {
	return item.toLowerCase();
};
var convertItemValue = function( value ) {
	return parseInt( value, 10 );
};

module.exports = {
	transform: function( oldDb ) {
		var transformed = {};
		Object.keys( oldDb ).forEach( function( itemValue ) {
			oldDb[ itemValue ].forEach( function( itemName ) {
				transformed[ convertItemName( itemName ) ] =
						convertItemValue( itemValue );
			});
		});
		return transformed;
	}
};
