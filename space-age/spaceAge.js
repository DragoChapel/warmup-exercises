"use strict";

var secondsToEarthYears = function( seconds ) {
	var SECONDS_IN_EARTH_YEAR = 31557600;
	return seconds / SECONDS_IN_EARTH_YEAR;
};

var roundToTwoPlaces = function( number ) {
	var SCALE = 100;
	return Math.round( number * SCALE ) / SCALE;
};

var getRelativeYears = function( seconds, relativeYears ) {
	return secondsToEarthYears( seconds ) / relativeYears;
};

var getPlanetMethod = function( relativeYears ) {
	return function planetMethod() {
		return roundToTwoPlaces(
			getRelativeYears( this.seconds, relativeYears )
		);
	};
};

var addPlanetMethods = function( planetData ) {
	this.prototype[ "on" + planetData.planetName ] =
			getPlanetMethod( planetData.yearRelativeToEarth );
};

var SpaceAge = function( seconds ) {
	this.seconds = seconds;
};

[
	{
		planetName: "Mercury",
		yearRelativeToEarth: 0.2408467
	},
	{
		planetName: "Earth",
		yearRelativeToEarth: 1
	},
	{
		planetName: "Venus",
		yearRelativeToEarth: 0.61519726
	},
	{
		planetName: "Mars",
		yearRelativeToEarth: 1.8808158
	},
	{
		planetName: "Jupiter",
		yearRelativeToEarth: 11.862615
	},
	{
		planetName: "Saturn",
		yearRelativeToEarth: 29.447498
	},
	{
		planetName: "Uranus",
		yearRelativeToEarth: 84.016846
	},
	{
		planetName: "Neptune",
		yearRelativeToEarth: 164.79132
	}
].forEach( addPlanetMethods.bind( SpaceAge ) );

module.exports = SpaceAge;
