"use strict";

var nary = require( "../n-ary/n-ary.js" );

var BASE = 3;
var VALID_VALUES = /^[012]+$/;
var DEFAULT_VALUE = "0";
var Trinary = nary.generate( BASE, VALID_VALUES, DEFAULT_VALUE );

module.exports = Trinary;
