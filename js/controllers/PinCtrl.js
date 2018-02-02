'use strict';

module.exports = function ($scope, $routeParams, PinFactory) {
    PinFactory.getPins($routeParams.boardID)
    .then(pins => {
        console.log('pins', pins);
        // Add firebase key to each pin.
        let pinArray = Object.keys(pins).map(key => {
            pins[key].id = key;
            return pins[key];
        });
        $scope.pinArray = pinArray;
    });

    $scope.deletePin = id => {
        PinFactory.deletePin(id);
    };
};