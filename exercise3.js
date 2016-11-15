'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _Redux = Redux;
var combineReducers = _Redux.combineReducers;
var _React = React;
var Component = _React.Component;
var _ReactRedux = ReactRedux;
var connect = _ReactRedux.connect;

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

/*
  Action creators
*/
var nextTodoId = 0;
var addTodo = function addTodo(text) {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    value: input.value
  };
};

var setVisibilityFilter = function setVisibilityFilter(filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
};

var toggleTodo = function toggleTodo(id) {
  return {
    type: 'TOGGLE_TODO',
    id: id
  };
};

/*
  Presentational component
*/

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

var mapStateToLinkProps = function mapStateToLinkProps(state, ownProps) {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};
var mapDispatchToLinkProps = function mapDispatchToLinkProps(dispatch, ownProps) {
  return {
    onClick: function onClick() {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};
var FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

var Footer = function Footer(_ref2) {
  var store = _ref2.store;
  return React.createElement(
    'p',
    null,
    'Show:',
    ' ',
    React.createElement(
      FilterLink,
      {
        filter: 'SHOW_ALL'
      },
      'All'
    ),
    ', ',
    React.createElement(
      FilterLink,
      {
        filter: 'SHOW_ACTIVE'
      },
      'Active'
    ),
    ', ',
    React.createElement(
      FilterLink,
      {
        filter: 'SHOW_COMPLETED'
      },
      'Completed'
    )
  );
};

var Todo = function Todo(_ref3) {
  var onClick = _ref3.onClick;
  var completed = _ref3.completed;
  var text = _ref3.text;
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

var TodoList = function TodoList(_ref4) {
  var todos = _ref4.todos;
  var onTodoClick = _ref4.onTodoClick;
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

var AddTodo = function AddTodo(_ref5) {
  var dispatch = _ref5.dispatch;

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
          dispatch(addTodo(input.value));
          input.value = '';
        } },
      'Add Todo'
    )
  );
};
// no state param, because component doesnt let on the state
// no dispatch param, because if null then we're reciving dispatch method
AddTodo = connect()(AddTodo);

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

var mapStateToTodoListProps = function mapStateToTodoListProps(state) {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};
var mapDispatchToTodoListProps = function mapDispatchToTodoListProps(dispatch) {
  return {
    onTodoClick: function onTodoClick(id) {
      dispatch(toggleTodo(id));
    }
  };
};
var VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

var TodoApp = function TodoApp() {
  return React.createElement(
    'div',
    null,
    React.createElement(AddTodo, null),
    React.createElement(VisibleTodoList, null),
    React.createElement(Footer, null)
  );
};

var _ReactRedux2 = ReactRedux;
var Provider = _ReactRedux2.Provider;
var _Redux2 = Redux;
var createStore = _Redux2.createStore;

ReactDOM.render(React.createElement(
  Provider,
  { store: createStore(todoApp) },
  React.createElement(TodoApp, null)
), document.getElementById('root'));
