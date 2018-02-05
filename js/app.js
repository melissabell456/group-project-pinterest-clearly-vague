'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');
const firebase = require('firebase');
// Other dependencies below

let isAuth = (AuthFactory, $window) =>
    new Promise((resolve, reject) => {
        AuthFactory.isAuthenticated().then(userBool => {
            if (userBool) {
                resolve();
            } else {
                $window.location.href = "#!/home";
                reject();
            }
        });
    });


const app = angular.module('kingPinApp', ['ngRoute'])
    .constant("FBUrl", "https://clearly-vague.firebaseio.com/")
    .config($routeProvider => {
        $routeProvider
        .when("/home", {
            templateUrl: "/partials/home.html",
            controller: "HomeCtrl"
        })
        .when("/boards", {
            templateUrl: "/partials/view-boards.html",
            controller: "BoardsCtrl",
            resolve: { isAuth }
        })
        .when("/boards/:boardID", {
            templateUrl: "/partials/view-pins.html",
            controller: "PinCtrl",
            resolve: { isAuth }
        })
        .when("/create-board", {
            templateUrl: "/partials/create-board.html",
            controller: "CreateBoardCtrl",
            resolve: { isAuth }
        })
        .when("/create-pin", {
            templateUrl: "/partials/create-pin.html",
            controller: "CreatePinCtrl",
            resolve: { isAuth }
        })
        .otherwise("/home");
    })
    .run(FBCreds => {
        let creds = FBCreds;
        let authConfig = {
            apiKey: creds.apiKey,
            authDomain: creds.authDomain
        };
        firebase.initializeApp(authConfig);
    });


require('./factories');
require('./controllers');
require('./values/fbcreds'); 


// Put routes here

module.exports = app;