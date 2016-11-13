'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Redux = Redux;
var createStore = _Redux.createStore;
var combineReducers = _Redux.combineReducers;
var _React = React;
var Component = _React.Component;

var todo = function todo(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return _extends({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
};

var todos = function todos(state, action) {
  if (state === undefined) state = [];

  switch (action.type) {
    case 'ADD_TODO':
      return [].concat(_toConsumableArray(state), [todo(undefined, action)]);
    case 'TOGGLE_TODO':
      return state.map(function (t) {
        return todo(t, action);
      });
    default:
      return state;
  }
};

var visibilityFilter = function visibilityFilter(state, action) {
  if (state === undefined) state = 'SHOW_ALL';

  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

var todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
var store = createStore(todoApp);

var Link = function Link(_ref) {
  var active = _ref.active;
  var children = _ref.children;
  var onClick = _ref.onClick;

  if (active) {
    return React.createElement(
      'span',
      null,
      children
    );
  }

  return React.createElement(
    'a',
    { href: '#',
      onClick: function (e) {
        e.preventDefault();
        onClick();
      }
    },
    children
  );
};

var FilterLink = (function (_Component) {
  _inherits(FilterLink, _Component);

  function FilterLink() {
    _classCallCheck(this, FilterLink);

    _get(Object.getPrototypeOf(FilterLink.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FilterLink, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      this.unsubscribe = store.subscribe(function () {
        return _this.forceUpdate();
      });
    }
  }, {
    key: 'componenWillUnmount',
    value: function componenWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = store.getState();

      return React.createElement(
        Link,
        {
          active: props.filter === state.visibilityFilter,
          onClick: function () {
            return store.dispatch({
              type: 'SET_VISIBILITY_FILTER',
              filter: props.filter
            });
          }
        },
        props.children
      );
    }
  }]);

  return FilterLink;
})(Component);

var Footer = function Footer() {
  return React.createElement(
    'p',
    null,
    'Show:',
    ' ',
    React.createElement(
      FilterLink,
      { filter: 'SHOW_ALL' },
      'All'
    ),
    ', ',
    React.createElement(
      FilterLink,
      { filter: 'SHOW_ACTIVE' },
      'Active'
    ),
    ', ',
    React.createElement(
      FilterLink,
      { filter: 'SHOW_COMPLETED' },
      'Completed'
    )
  );
};

var Todo = function Todo(_ref2) {
  var onClick = _ref2.onClick;
  var completed = _ref2.completed;
  var text = _ref2.text;
  return React.createElement(
    'li',
    {
      onClick: onClick,
      style: {
        textDecoration: completed ? 'line-through' : 'none'
      }
    },
    text
  );
};

var TodoList = function TodoList(_ref3) {
  var todos = _ref3.todos;
  var onTodoClick = _ref3.onTodoClick;
  return React.createElement(
    'ul',
    null,
    todos.map(function (todo) {
      return React.createElement(Todo, _extends({
        key: todo.id
      }, todo, {
        onClick: function () {
          return onTodoClick(todo.id);
        }
      }));
    })
  );
};

var AddTodo = function AddTodo(_ref4) {
  var onAddClick = _ref4.onAddClick;

  var input = undefined;

  return React.createElement(
    'div',
    null,
    React.createElement('input', { ref: function (node) {
        input = node;
      } }),
    React.createElement(
      'button',
      { onClick: function () {
          onAddClick(input.value);
          input.value = '';
        } },
      'Add Todo'
    )
  );
};

var getVisibleTodos = function getVisibleTodos(todos, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(function (t) {
        return t.completed;
      });
    case 'SHOW_ACTIVE':
      return todos.filter(function (t) {
        return !t.completed;
      });
  }
};

var nextTodoId = 0;
var TodoApp = function TodoApp(_ref5) {
  var todos = _ref5.todos;
  var visibilityFilter = _ref5.visibilityFilter;
  return React.createElement(
    'div',
    null,
    React.createElement(AddTodo, {
      onAddClick: function (text) {
        return store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: text
        });
      }
    }),
    React.createElement(TodoList, {
      todos: getVisibleTodos(todos, visibilityFilter),
      onTodoClick: function (id) {
        return store.dispatch({
          type: 'TOGGLE_TODO',
          id: id
        });
      }
    }),
    React.createElement(Footer, null)
  );
};

var render = function render() {
  ReactDOM.render(React.createElement(TodoApp, store.getState()), document.getElementById('root'));
};

store.subscribe(render);
render();
