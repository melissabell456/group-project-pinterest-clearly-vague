'use strict';

const angular = require('angular');
// Other dependencies below

const app = angular.module('testApp', []);


require('./factories');
require('./controllers');


// Put routes here

module.exports = app;