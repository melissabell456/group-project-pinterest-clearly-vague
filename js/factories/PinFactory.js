'use strict';

const angular = require('angular');
const firebase = require('firebase');


module.exports = function ($q, $http, FBUrl) {

    const addNewPin = (newPinObj) => {
        return $q((resolve, reject) => {
            $http
                .post(`${FBUrl}/pins.json`,
                JSON.stringify(newPinObj))
                .then((returnedData) => {
                    console.log("what is returned", returnedData);
                })
                .catch((err) => {
                    console.log("no luck", err);
                });
        });
    };

    const getBoards = () => {
        return $q((resolve, reject) => {
            $http
                .get(`${FBUrl}/boards.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
                .then((boardData) => {
                    Object.keys(boardData.data).map(boardKey => {
                        boardData.data[boardKey].board_id = boardKey;
                        return boardData[boardKey];
                    });
                    resolve(boardData);
                });
        });
    };

    const addBoard = boardObj => {
        return $q((resolve, reject) => {
            console.log("this will go to firebase", boardObj);
            $http
                .post(`${FBUrl}/boards.json`,
                JSON.stringify(boardObj))
                .then(({ data }) => { });
        });
    };

    const deleteBoards = boardId => {
        return $q((resolve, reject) => {
            $http.delete(`${FBUrl}/boards/${boardId}.json`)
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    const getPins = boardId => {
        return $q((resolve, reject) => {
            $http
                .get(`${FBUrl}/pins.json?orderBy="board_id"&equalTo="${boardId}"`)
                .then(({ data }) => resolve(data))
                .catch(err => console.log('err', err));
        });
    };

    const deletePin = id => {
        return $q((resolve, reject) => {
            $http
                .delete(`${FBUrl}pins/${id}.json`)
                .then(({ data }) => resolve(data));
        });
    };


    return { addBoard, getBoards, getPins, deletePin, addNewPin, deleteBoards};
};
