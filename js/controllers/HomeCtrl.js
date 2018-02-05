'use strict';

module.exports = function ($scope, AuthFactory, $window) {

    $scope.login = () => AuthFactory.loginUser();

};