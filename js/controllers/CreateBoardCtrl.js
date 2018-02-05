'use strict';

const firebase = require('firebase');

module.exports =function($scope, $window, PinFactory) {
    $scope.saveBoard = () => {
        $scope.board.uid = firebase.auth().currentUser.uid;
        PinFactory.addBoard($scope.board)
        .then( () => {
           $window.location.href = `#!/boards`;
        });
    };
};
