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

  const getBoards = (uid) => {
        return $q((resolve, reject) => {
            $http
            .get(`${FBUrl}`)
            .then(({data}) => {
                let boardArr = Object.keys(data).map(boardKey => {
                    console.log('boardKey', boardKey);
                    data[boardKey].id = boardKey;
                    return data[boardKey];
                });
            });
        });
    };
    
    const addBoard = boardObj => {
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
    };

    const getPins = boardId => {
        return $q((resolve, reject) => {
            $http
            .get(`${FBUrl}/pins.json?orderBy="board_id"&equalTo="${boardId}"`)
            .then(({data}) => resolve(data));
        });
    };

    const deletePin = id => {
        return $q((resolve, reject) => {
            $http
            .delete(`${FBUrl}pins/${id}.json`)
            .then(({data}) => resolve(data));
        });
    };


    return {addBoard, getBoards, getPins, deletePin};
};
    