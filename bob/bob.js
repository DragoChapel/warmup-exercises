"use strict";

var silentHandler = {
	test: function( message ) {
		return message.length === 0;
	},
	response: "Fine. Be that way!"
};
var questionHandler = {
	test: function( message ) {
		return message[ message.length - 1 ] === "?";
	},
	response: "Sure."
};
var yellingHandler = {
	test: function( message ) {
		return message.toUpperCase() === message &&
			message.toLowerCase() !== message;
	},
	response: "Woah, chill out!"
};
var defaultHandler = {
	test: function() {
		return true;
	},
	response: "Whatever."
};

var handlers = [
		silentHandler, yellingHandler, questionHandler, defaultHandler
	];

var getResponse = function( message, handlers ) {
	var response;

	handlers.some( function ( handler ) {
		if ( handler.test( message ) ) {
			response = handler.response;
			return true;
		}
	});

	return response;
};

var Bob = function() {};
Bob.prototype.hey = function( message ) {
	return getResponse( message.trim(), handlers );
};

module.exports = Bob;
