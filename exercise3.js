"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createStore = Redux.createStore;
var combineReducers = Redux.combineReducers;
var Component = React.Component;

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

//const todoApp = (state = {}, action) => {
//  return {
//    todos: todos(state.todos, action),
//    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//  }
//};

//const combineReducers = (reducers) => {
//  return (state = {}, action) => {
//    return Object.keys(reducers).reduce(
//      (nextState, key) => {
//        nextState[key] = reducers[key](state[key], action);
//        return nextState;
//      },
//      {}
//    );
//  }
//};

var todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter });

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

var store = createStore(todoApp);

var TodoList = function (_ref) {
  var todos = _ref.todos;
  var onTodoClick = _ref.onTodoClick;

  return React.createElement(
    "ul",
    null,
    todos.map(function (t) {
      return React.createElement(TodoItem, _extends({
        key: t.id
      }, t, {
        onClick: function () {
          return onTodoClick(t.id);
        }
      }));
    })
  );
};

var TodoItem = function (_ref) {
  var onClick = _ref.onClick;
  var completed = _ref.completed;
  var text = _ref.text;

  return React.createElement(
    "li",
    { onClick: onClick,
      style: {
        textDecoration: completed ? "line-through" : "none"
      } },
    text
  );
};

var FilterLink = function (_ref) {
  var filter = _ref.filter;
  var currentFilter = _ref.currentFilter;
  var children = _ref.children;

  if (currentFilter === filter) {
    return React.createElement(
      "span",
      null,
      children
    );
  }

  return React.createElement(
    "a",
    { href: "#",
      onClick: function (e) {
        e.preventDefault();
        store.dispatch({
          type: "SET_VISIBILITY_FILTER",
          filter: filter });
      }
    },
    children
  );
};

var getVisibleTodos = function (todos, filter) {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(function (t) {
        return t.completed;
      });
    case "SHOW_ACTIVE":
      return todos.filter(function (t) {
        return !t.completed;
      });
      dafault: return todos;
  };
};

var nextTodoId = 0;

var TodoApp = (function (_Component) {
  function TodoApp() {
    _classCallCheck(this, TodoApp);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(TodoApp, _Component);

  _createClass(TodoApp, {
    render: {
      value: function render() {
        var _this = this;

        var _props = this.props;
        var todos = _props.todos;
        var visibilityFilter = _props.visibilityFilter;

        var visibleTodos = getVisibleTodos(todos, visibilityFilter);

        return React.createElement(
          "div",
          null,
          React.createElement("input", { type: "text",
            ref: function (node) {
              return _this.input = node;
            } }),
          React.createElement(
            "button",
            { onClick: function () {
                store.dispatch({
                  type: "ADD_TODO",
                  text: _this.input.value,
                  id: nextTodoId++
                });
                _this.input.value = "";
              } },
            "Add Todo"
          ),
          React.createElement(TodoList, {
            todos: visibleTodos,
            onTodoClick: function (id) {
              return store.dispatch({
                type: "TOGGLE_TODO",
                id: id
              });
            }
          }),
          React.createElement(
            "p",
            null,
            "Show:",
            React.createElement(
              FilterLink,
              { filter: "SHOW_ALL",
                currentFilter: visibilityFilter },
              "All"
            ),
            " ",
            React.createElement(
              FilterLink,
              { filter: "SHOW_ACTIVE",
                currentFilter: visibilityFilter },
              "Active"
            ),
            " ",
            React.createElement(
              FilterLink,
              { filter: "SHOW_COMPLETED",
                currentFilter: visibilityFilter },
              "Completed"
            ),
            " "
          )
        );
      }
    }
  });

  return TodoApp;
})(Component);

var render = function () {
  ReactDOM.render(React.createElement(TodoApp, {
    todos: store.getState().todos,
    visibilityFilter: store.getState().visibilityFilter
    // {...store.getState()} -->
  }), document.querySelector("#root"));
};

store.subscribe(render);
render();
