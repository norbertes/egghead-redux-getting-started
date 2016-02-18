"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var addCounter = function (list) {
  return [].concat(_toConsumableArray(list), [0]);
};

var removeCounter = function (list, idx) {
  return [].concat(_toConsumableArray(list.slice(0, idx)), _toConsumableArray(list.slice(idx + 1)));
};

var incrementCounter = function (list, idx) {
  //const newArr = [...list];
  //newArr[idx]++
  //return newArr;

  return [].concat(_toConsumableArray(list.slice(0, idx)), [list[idx] + 1], _toConsumableArray(list.slice(idx + 1)));
};

var testAddCounter = function () {
  var listBefore = [];
  var listAfter = [0];

  deepFreeze(listBefore);

  expect(addCounter(listBefore)).toEqual(listAfter);
};

var testRemoveCounter = function () {
  var listBefore = [0, 10, 20];
  var listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};

var testIncrementCounter = function () {
  var listBefore = [0, 10, 20];
  var listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();

console.log("tests passed");
