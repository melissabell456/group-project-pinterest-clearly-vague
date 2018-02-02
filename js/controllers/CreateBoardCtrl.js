'use strict';

const firebase = require('firebase');

module.exports =function($scope, $location, PinFactory) {
    $scope.saveBoard = () => {
        console.log('New Board to add', $scope.board );
        $scope.board.uid = firebase.auth().currentUser.uid;
        PinFactory.addBoard($scope.board)
        .then( (data) => {
        $location.url("/boards/new");
        });
    };
};
