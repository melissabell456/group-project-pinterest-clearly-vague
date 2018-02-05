'use strict';

const firebase = require('firebase');

module.exports = function($scope, PinFactory, $route, $window){

    PinFactory.getBoards()
    .then(boards => {
        $scope.boards = boards;
    });

    $scope.deleteBoard = (boardId) => {
        PinFactory.deleteBoards(boardId)
        .then(boards => {
            $scope.boards = boards;
            $window.location.reload();
        });
    };
};

