/**
 * @param {number} n
 * @return {Function} counter
 */

let userVal = 0;
var createCounter = function (n) {
  userVal = n - 1;
  return function () {
    userVal++;
    return userVal;
  };
};

const counter = createCounter(10);
console.log(counter()); // 10
console.log(counter()); // 11
console.log(counter()); // 12
