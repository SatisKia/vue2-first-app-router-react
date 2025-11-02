import { createStore } from 'redux';

// State
const state = {
  todoList: [],
  dateType: 1,
  dispYear: true,
};

// Reducer
const reducer = (oldState = state, action) => {
  if (action.type === 'initialize') {
    return Object.assign({}, oldState, { todoList: [] });
  }
  if (action.type === 'push') {
    return Object.assign({}, oldState, { todoList: [...oldState.todoList, action.payload.todo] });
  }
  if (action.type === 'add') {
    return Object.assign({}, oldState, { todoList: [...oldState.todoList, action.payload.todo] });
  }
  if (action.type === 'remove') {
    return Object.assign({}, oldState, { todoList: oldState.todoList.filter(todo => todo.id !== action.payload.id) });
  }
  if (action.type === 'done') {
    const todo = oldState.todoList.find(todo => todo.id === action.payload.id);
    if (todo) {
      todo.done = !todo.done
    }
    return Object.assign({}, oldState, { todoList: oldState.todoList });
  }
  if (action.type === 'setDateType') {
    return Object.assign({}, oldState, { dateType: action.payload.dateType });
  }
  if (action.type === 'setDispYear') {
    return Object.assign({}, oldState, { dispYear: action.payload.dispYear });
  }
  return oldState;
};

// Store
const store = createStore(reducer);

export default store;
