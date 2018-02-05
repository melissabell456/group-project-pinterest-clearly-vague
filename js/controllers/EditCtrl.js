'use strict';

module.exports = function ($scope, $routeParams, AuthFactory, PinFactory, $window, $location) {

    let FbID = $routeParams.id;

    PinFactory.onePin(FbID)
    .then(pinDetail => $scope.pin = pinDetail);

    $scope.savePin = () => {
        PinFactory.editPin($scope.pin, FbID)
        .then(() =>
        $window.location.href = `#!/boards/${$scope.pin.board_id}`);
    };
};
