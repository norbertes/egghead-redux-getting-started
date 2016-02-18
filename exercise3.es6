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

const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
  }
};

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
console.log('passed');

const { createStore } = Redux;
const store = createStore(todoApp);

console.log(store.getState());
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'test',
});
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'test2',
});
console.log(store.getState());
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 1
});
console.log(store.getState());
