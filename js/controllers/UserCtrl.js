'use strict';

module.exports = function ($scope, $window, AuthFactory) {

    $scope.login = () => AuthFactory.loginUser();

    $scope.logout = () => AuthFactory.logoutUser();

};