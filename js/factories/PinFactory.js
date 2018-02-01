'use strict';

const angular = require('angular');

module.exports = function ($q, $http, FBUrl) {

  const addPin = (newPinObj) => {
    console.log(newPinObj);
    // return $q( (resolve, reject) => {
    //   $http
    //   .post(`${FBUrl}/pins.json`, 
    //   JSON.stringify(newPinObj))
    //   .then( (returnedData) => {
    //     console.log("what is returned", returnedData);
    //   })
    //   .catch((err) => {
    //     console.log("no luck", err);
    //   });
    // });
  };

  return { addPin };

};