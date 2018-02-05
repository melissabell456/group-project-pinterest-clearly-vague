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
            resolve(returnedData);
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
            .then(({data: boardData}) => {
                Object.keys(boardData).map(boardKey => {
                    boardData[boardKey].board_id = boardKey;
                    return boardData[boardKey];
                });

                /*
                Adds first pin image to each respective board.
                    */
                let boardsWithImagePromiseArray = [];
                // Loop over recived board and get their pins
                Object.values(boardData).forEach(({board_id}) => {
                    boardsWithImagePromiseArray.push(getPins(board_id));
                });
                // Wait until all pins are recived and take out first image.
                Promise.all(boardsWithImagePromiseArray).then(pinPromises => {
                    let pinsPromisesArray = Object.values(pinPromises);
                    console.log('pinPromiseseArray', pinsPromisesArray);
                    // If there are any images in the board
                    pinsPromisesArray.map(pins => {
                        let pinArray = Object.values(pins);
                        if(pinArray.length  >  0){
                            let firstPin = pinArray[0];
                            let boardToAddImage = Object.values(boardData).find(({board_id}) => board_id === firstPin.board_id);
                            boardToAddImage.img = firstPin.img;
                        }
                    });
                    resolve(boardData);
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
                .then(data => resolve(data));
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

    const editPin = (boardId, id) => {
        console.log(id, "test");
        return $q((resolve, reject) => {
            $http
                .patch(`${FBUrl}pins/${id}.json`) 
                .then(({ data }) => resolve(data));
        });
    };

    const deletePin = id => {
        return $q((resolve, reject) => {
            $http
                .delete(`${FBUrl}pins/${id}.json`)
                .then(({ data }) => resolve(data));
        });
    };


    return { addBoard, getBoards, getPins, editPin, addNewPin, deleteBoards, deletePin};
};
