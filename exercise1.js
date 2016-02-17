//const createStore = (reducer) => {
//  let state;
//  let listeners = [];
//
//  const getState = () => state;
//
//  const dispatch = (action) => {
//    state = reducer(state, action);
//    listeners.forEach( (listener) => listener() );
//  };
//
//  const subscribe = (listener) => {
//    listeners.push(listener);
//
//    return () => {
//      listeners = listeners.filter( l => this !== listener );
//    }
//  };
//
//  dispatch({});
//
//  return { getState, dispatch, subscribe };
//};

"use strict";

var createStore = Redux.createStore;

var counter = function (_x, action) {
  var state = arguments[0] === undefined ? 0 : arguments[0];

  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

var Counter = function (_ref) {
  var value = _ref.value;
  var onIncrement = _ref.onIncrement;
  var onDecrement = _ref.onDecrement;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      value
    ),
    React.createElement(
      "button",
      { onClick: onIncrement },
      "+"
    ),
    React.createElement(
      "button",
      { onClick: onDecrement },
      "-"
    )
  );
};

var store = createStore(counter);
var render = function () {
  ReactDOM.render(React.createElement(Counter, { value: store.getState(),
    onIncrement: function () {
      return store.dispatch({ type: "INCREMENT" });
    },
    onDecrement: function () {
      return store.dispatch({ type: "DECREMENT" });
    }
  }), document.getElementById("root"));
};

render();
store.subscribe(render);
