"use strict";

var nary = require( "../n-ary/n-ary.js" );

var BASE = 2;
var VALID_VALUES = /^[10]+$/;
var DEFAULT_VALUE = "0";
var Binary = nary.generate( BASE, VALID_VALUES, DEFAULT_VALUE );

module.exports = Binary;
