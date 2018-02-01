'use strict';

const firebase = require('firebase');

module.exports = function ($scope, AuthFactory, $window) {
    $scope.navMenuList = [
        {
            text: "Add Board",
            url: "#!/createboard"
        },
        {
            text: "Add Pin",
            url: "#!/createpin"
        },
        {
            text: "My Boards",
            url: "#!/boards"
        },
        {
            text: "Login",
            url: "#!/login",
            hideWhenLoggedIn: true
        },
        {
            text: "Logout",
            url: "#!/logout"
        }
    ];

    // If the url is #!/logout, then logout, otherwise go to url.
    $scope.navigate = url => {
        if (url === "#!/logout") AuthFactory.logoutUser();
        else if (url === "#!/login") AuthFactory.loginUser();
        else $window.location.href = url;
    };

    $scope.isLoggedIn = () => firebase.auth().currentUser;

};