"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var todo = function (state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }
      //return {
      //  ...state,
      //  completed: !state.completed,
      //};
      return Object.assign({}, state, {
        completed: !state.completed });
    default:
      return state;
  };
};

var todos = function (_x, action) {
  var state = arguments[0] === undefined ? [] : arguments[0];

  switch (action.type) {
    case "ADD_TODO":
      return [].concat(_toConsumableArray(state), [todo(undefined, action)]);
    case "TOGGLE_TODO":
      return state.map(function (t) {
        return todo(t, action);
      });
    default:
      return state;
  }
};

var visibilityFilter = function (_x, action) {
  var state = arguments[0] === undefined ? "SHOW_ALL" : arguments[0];

  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

var todoApp = function (_x, action) {
  var state = arguments[0] === undefined ? {} : arguments[0];

  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action) };
};

var testAddTodo = function () {
  var stateBefore = [];
  var action = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux"
  };
  var stateAfter = [{
    id: 0,
    text: "Learn Redux",
    completed: false }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

var testToggleTodo = function () {
  var stateBefore = [{
    id: 0,
    text: "Learn Redux",
    completed: false }, {
    id: 1,
    text: "Shopping",
    completed: false }];

  var action = {
    type: "TOGGLE_TODO",
    id: 1 };

  var stateAfter = [{
    id: 0,
    text: "Learn Redux",
    completed: false }, {
    id: 1,
    text: "Shopping",
    completed: true }];

  expect(todo(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
console.log("passed");

var createStore = Redux.createStore;

var store = createStore(todoApp);

console.log(store.getState());
store.dispatch({
  type: "ADD_TODO",
  id: 0,
  text: "test" });
store.dispatch({
  type: "ADD_TODO",
  id: 1,
  text: "test2" });
console.log(store.getState());
store.dispatch({
  type: "TOGGLE_TODO",
  id: 1
});
console.log(store.getState());
