"use strict";

var addStudentToGrade = function( studentsInGrade, newStudent ) {
	return studentsInGrade.concat( newStudent );
};

var getGrade = function( db, grade ) {
	var result = db[ grade ];
	if ( result === undefined ) {
		result = [];
	}
	return result.concat();
};

var getSortedGrade = function( db, grade ) {
	return getGrade( db, grade ).sort();
};

var School = function( name ) {
	this.name = name;
	this.db = {};
};

School.prototype.add = function( student, grade ) {
	this.db[ grade ] = addStudentToGrade( getGrade( this.db, grade ), student );
};

School.prototype.grade = function( grade ) {
	return getGrade( this.db, grade );
};

School.prototype.sort = function() {
	var sortedDb = {};
	Object.keys( this.db ).forEach( function( grade ) {
		sortedDb[ grade ] = getSortedGrade( this.db, grade );
	}.bind( this ) );
	return sortedDb;
};

module.exports = School;
