'use strict';

const angular = require('angular');
const firebase = require('firebase');


module.exports = function ($q, $http, FBUrl) {

  const addNewPin = (newPinObj) => {
    return $q( (resolve, reject) => {
          $http
          .post(`${FBUrl}/pins.json`, 
          JSON.stringify(newPinObj))
          .then( (returnedData) => {
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
              });
          });
  }
  
  const deleteBoard = (boardObj) => {
    return $q((resolve, reject) => {
      $http.delete(`${FBUrl}/boards.json`)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
    return { addBoard, getBoards, addNewPin, deleteBoard };

};
    