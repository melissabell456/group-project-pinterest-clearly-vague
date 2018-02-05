'use strict';

module.exports = function ($scope, $routeParams, AuthFactory, PinFactory, $window, $location) {
    AuthFactory.isAuthenticated()
    .then(user => {
    $scope.id = $routeParams.id;
    PinFactory.getPins($scope.id);
    })
    .catch(err => $location.path("/login"));

    $scope.editPin = id => {
        console.log(id, "work");
        PinFactory.editPin(id)
        .then(() => $window.location.reload());
    };

    $scope.savePin = () => PinFactory.editPin($scope.id)
    .then(data => $location.path(`/board/${data.boardId}/pin/${$scope.id}`));
    };
