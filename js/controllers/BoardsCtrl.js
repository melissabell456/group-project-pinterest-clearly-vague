'use strict';

const firebase = require('firebase');

module.exports = function($scope, PinFactory){
    PinFactory.getBoards()
    .then(boards => {
        $scope.boards = boards.data;
    });
};