'use strict';

const firebase = require('firebase');

module.exports = function($scope, PinFactory){
    PinFactory.getBoards()
    .then(boards => {
        $scope.boards = boards;
    });
};

module.exports =function($scope, $location, PinFactory) {
    $scope.title = "New";
    $scope.board = {
        title: ''
    };

    $scope.saveBoard = () => {
        console.log('New Board to add', $scope.board );
        $scope.board.uid = firebase.auth().currentUser.uid;
        PinFactory.addBoard($scope.board)
        .then( (data) => {
        $location.url("/boards/new");
        });
    };
};
