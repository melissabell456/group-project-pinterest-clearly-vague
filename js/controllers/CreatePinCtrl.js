'use strict';

const angular = require('angular');
const firebase = require('firebase');

module.exports = function ($scope, PinFactory, $window) {

  let uid = firebase.auth().currentUser.uid;
  
  $scope.savePin = () => {
    $scope.pin.uid = uid;
    PinFactory.addNewPin($scope.pin)
    .then(() => $window.location.href = `#!/boards/${$scope.pin.board_id}`);
  };

  PinFactory.getBoards()
  .then(userBoards => {
    $scope.userBoards = userBoards;
  })
  .catch(err => {
    console.log(err);
  });
    

};