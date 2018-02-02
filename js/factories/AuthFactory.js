'use strict';

const firebase = require('firebase');

module.exports = function (FBCreds, $q, $window) {

    let provider = new firebase.auth.GoogleAuthProvider();
    let currentUser = null;

    const loginUser = () => {
        firebase.auth().signInWithPopup(provider)
            .then(({ user }) => {
                console.log("logged in!", user.G, user.displayName);
                // $window.location.href = "#!/boards";
            })
            .catch(error => console.log('error', error));
    };

    const logoutUser = () => {
        firebase.auth().signOut()
        .then(() => {
            console.log('logged out, goodbye.');
            $window.location.href = "#!/home";
        })
        .catch(error => console.log('error', error));
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

    return { loginUser, logoutUser, isAuthenticated  };

};