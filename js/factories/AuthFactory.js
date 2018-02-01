'use strict';

const firebase = require('firebase');

module.exports = function (FBCreds, $q) {

    let currentUser = null;

    const createUser = ({ email, password }) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    };

    const loginUser = ({ email, password }) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    const logoutUser = () => {
        return firebase.auth().signOut();
    };

    const isAuthenticated = () => {
        console.log("Authentication: Called");
        return $q((resolve, reject) => {
            console.log("AuthState: Changed");
            firebase.auth().onAuthStateChanged((user) => {
                console.log("AuthState: Complete");
                if (user) {
                    console.log("user", user);
                    currentUser = user.uid;
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    };

    return { createUser, loginUser, logoutUser, isAuthenticated  };

};