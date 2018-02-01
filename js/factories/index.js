'use strict';
const app = require('angular').module("kingPinApp");

app.factory('AuthFactory', require('./AuthFactory'));
app.factory('PinFactory', require('./PinFactory'));