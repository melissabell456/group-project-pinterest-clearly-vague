'use strict';

const firebase = require('firebase');

module.exports = function($q, $http, FBUrl) {
    const getBoards = (uid) => {
        return $q((resolve, reject) => {
            $http
            .get(`${FBUrl}`)
            .then(({data}) => {
                resolve(data);
            });
        });
    };

    function addBoards() {
        return $q((resolve, reject) => {
            $http
                .post(`${FBUrl}/boards.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`);
                JSON.stringify(addBoards)
                .then(({ data }) => {
                    let boardArr = Object.keys(data).map(boardKey => {
                        console.log('boardKey', boardKey);
                        data[boardKey].id = boardKey;
                        return data[boardKey];
                    });
                });
        });
    }
        return {addBoards, getBoards};
    };
    