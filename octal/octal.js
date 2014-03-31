"use strict";

var nary = require( "../n-ary/n-ary.js" );

var BASE = 8;
var VALID_VALUES = /^[0-7]+$/;
var DEFAULT_VALUE = "0";
var Octal = nary.generate( BASE, VALID_VALUES, DEFAULT_VALUE );

module.exports = Octal;
