'use strict';

module.exports = function ($scope, $routeParams, PinFactory, $window) {
    PinFactory.getPins($routeParams.boardID)
    .then(pins => {
        // Add firebase key to each pin.
        let pinArray = Object.keys(pins).map(key => {
            pins[key].id = key;
            return pins[key];
        });
        $scope.pinArray = pinArray;
    });

    $scope.deletePin = id => {
        PinFactory.deletePin(id)
        .then(() => $window.location.reload());
    };
};