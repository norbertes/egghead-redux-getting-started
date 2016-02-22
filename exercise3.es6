'use strict';

const { createStore, combineReducers } = Redux;
const { Component } = React;

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
          id: action.id,
          text: action.text,
          completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      //return {
      //  ...state,
      //  completed: !state.completed,
      //};
      return Object.assign({}, state, {
        completed: !state.completed,
      });
    default:
      return state;
  };
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map( (t) => todo(t, action) );
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
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

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false,
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [{
    id: 0,
    text: 'Learn Redux',
    completed: false,
  }, {
    id: 1,
    text: 'Shopping',
    completed: false,
  }];

  const action = {
    type: 'TOGGLE_TODO',
    id: 1,
  };

  const stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false,
  }, {
    id: 1,
    text: 'Shopping',
    completed: true,
  }];

  expect(
    todo(stateBefore, action)
  ).toEqual(stateAfter);
};
testAddTodo();

const store = createStore(todoApp);

const TodoList = ({ todos, onTodoClick }) => {
  return (
    <ul>
      { todos.map( (t) => (
        <TodoItem
          key={t.id}
          {...t}
          onClick={() => onTodoClick(t.id) }
        />
      ))}
    </ul>
  );
};

const TodoItem = ({
  onClick,
  completed,
  text
}) => {
  return (
    <li onClick={ onClick }
       style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}>
      { text }
    </li>
  );
}

const FilterLink = ({ filter, currentFilter, children }) => {
  if (currentFilter === filter) {
    return <span>{children}</span>;
  }

  return (
    <a href="#"
       onClick={ (e) => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter,
        });
       } }
    >
      {children}
    </a>
  );
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter( t => t.completed );
    case 'SHOW_ACTIVE':
      return todos.filter( t => !t.completed );
    dafault:
      return todos;
  };
};

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    const {
      todos,
      visibilityFilter
    } = this.props;

    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    );

    return (
      <div>
        <input type="text"
               ref={node => this.input = node} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          });
          this.input.value = '';
        }}>
          Add Todo
        </button>
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          }
        />
        <p>
          Show:
          <FilterLink filter='SHOW_ALL'
                      currentFilter={visibilityFilter}>
            All
          </FilterLink>{' '}
          <FilterLink filter='SHOW_ACTIVE'
                      currentFilter={visibilityFilter}>
            Active
          </FilterLink>{' '}
          <FilterLink filter='SHOW_COMPLETED'
                      currentFilter={visibilityFilter}>
            Completed
          </FilterLink>{' '}

        </p>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
      visibilityFilter={store.getState().visibilityFilter}
      <!-- {...store.getState()} -->
    />,
    document.querySelector('#root')
  )
};

store.subscribe(render);
render();
