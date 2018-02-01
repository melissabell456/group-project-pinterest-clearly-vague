'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');
const firebase = require('firebase');
// Other dependencies below

let isAuth = (AuthFactory) =>
    new Promise((resolve, reject) => {
        AuthFactory.isAuthenticated().then(userBool => {
            console.log("user???", userBool);
            if (userBool) {
                console.log("Authenticated user. Go ahead");
                resolve();
            } else {
                console.log("Not Authenticated user. Go away");
                reject();
            }
        });
    });


const app = angular.module('kingPinApp', ['ngRoute'])
    .constant("FBUrl", "https://clearly-vague.firebaseio.com/")
    .config($routeProvider => {
        $routeProvider
        .when("/login", {
            templateUrl: "/partials/nav.html",
            controller: "/NavCtrl"
        })
        .when("/boards", {
            templateUrl: "/partials/view-boards.html",
            controller: "BoardsCtrl",
            resolve: {isAuth}
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
        .otherwise("/login");
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