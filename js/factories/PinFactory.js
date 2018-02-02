'use strict';

const firebase = require('firebase');

module.exports = function($q, $http, FBUrl) {

    const getBoards = () => {
        return $q((resolve, reject) => {
            $http
                .get(`${FBUrl}/boards.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
            .then((boardData) => {
                Object.keys(boardData.data).map(boardKey => {
                    boardData.data[boardKey].board_id = boardKey;
                    return boardData[boardKey];});
                resolve(boardData);
            });
        });
    };

    function addBoard(boardObj) {
        return $q((resolve, reject) => {
            console.log("this will go to firebase", boardObj);
            $http
                .post(`${FBUrl}/boards.json`,
                JSON.stringify(boardObj))
                .then(({ data }) => {
                    console.log(Object.keys(data), "data");
                    // let boardArr = Object.keys(data).map(boardKey => {
                    //     console.log('boardKey', boardKey);
                    //     data[boardKey].id = boardKey;
                    //     return data[boardKey];
                    // });
                });
            });
    }
        return {addBoard, getBoards};
    };
    