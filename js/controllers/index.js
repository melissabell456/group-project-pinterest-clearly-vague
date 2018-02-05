"use strict";

const app = require('angular').module("kingPinApp");

// Add controls below
app.controller('BoardsCtrl', require('./BoardsCtrl'));
app.controller('CreateBoardCtrl', require('./CreateBoardCtrl'));
app.controller('CreatePinCtrl', require('./CreatePinCtrl'));
app.controller('HomeCtrl', require('./HomeCtrl'));
app.controller('NavCtrl', require('./NavCtrl'));
app.controller('PinCtrl', require('./PinCtrl'));
app.controller('UserCtrl', require('./UserCtrl'));
app.controller('EditCtrl', require('./EditCtrl'));
