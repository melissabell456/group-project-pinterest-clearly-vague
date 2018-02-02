'use strict';

const firebase = require('firebase');

module.exports = function (FBCreds, $q, $window, $http, FBUrl) {

    let provider = new firebase.auth.GoogleAuthProvider();
    let currentUser = null;

    const loginUser = () => {
        firebase.auth().signInWithPopup(provider)
            .then((user) => {
                console.log("logged in!", user);
                let userDetails = {
                    name: user.displayName,
                    uid: user.G,
                };
                addUserToDB(userDetails);
                // $window.location.href = "#!/boards";
            })
            .catch(error => console.log('error', error));
    };

    const addUserToDB = (userObj) => {
        // console.log(userObj);
        // return $q( (resolve, reject) => {
        //     $http
        //     .post(`${FBUrl}/users.json`, 
        //     JSON.stringify(userObj))
        //     .then( (data) => {
        //         console.log(data);
        //     })
        //     .catch( (err) => {
        //         console.log(err);
        //     });
        // });
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