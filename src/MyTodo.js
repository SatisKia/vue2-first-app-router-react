import React from 'react';
import MyStorage from './service/Storage.js';
import TodoInput from './TodoInput';
import TodoLabel from './TodoLabel';
import store from './store';

class MyTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: []
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.doneTodo = this.doneTodo.bind(this);
  }

  loadData() {
    console.log('loadData');

    // データの読み込み処理
    store.dispatch({ type: 'initialize' });
    const storage: MyStorage = new MyStorage();
    for (let i = 0; ; i++) {
      const id = storage.getValue('id' + i, '');
      if (id.length === 0) {
        break;
      }
      const done = storage.getBool('done' + i, false);
      const date = new Date(storage.getNumber('date' + i, 0));
      const text = storage.getValue('text' + i, '');
      const color = storage.getValue('color' + i, '');
      store.dispatch({ type: 'push', payload: {
        todo: {
          id: id,
          done: done,
          date: date,
          text: text,
          color: color
        }
      } });
    }
    store.dispatch({ type: 'setDateType', payload: { dateType: storage.getNumber('dateType', 1) } });
    store.dispatch({ type: 'setDispYear', payload: { dispYear: storage.getBool('dispYear', true) } });
    console.log(store.getState().dateType);

    this.setState({ todoList: this.sortedTodo() });
  }
  saveData() {
    console.log('saveData');

    // データの書き込み処理
    const todoList = store.getState().todoList;
    const storage: MyStorage = new MyStorage();
    let i = 0;
    for (; i < todoList.length; i++) {
      const todo = todoList[i];
      storage.setValue('id' + i, todo.id);
      storage.setBool('done' + i, todo.done);
      storage.setNumber('date' + i, todo.date.getTime());
      storage.setValue('text' + i, todo.text);
      storage.setValue('color' + i, todo.color);
    }
    storage.setValue('id' + i, '');

    this.setState({ todoList: this.sortedTodo() });
  }
  addTodo(text, color) {
    store.dispatch({ type: 'add', payload: {
      todo: {
        id: (new Date()).getTime().toString(),
        done: false,
        date: new Date(),
        text: text,
        color: color
      }
    } });
    this.saveData();
  }
  removeTodo(id) {
    store.dispatch({ type: 'remove', payload: { id: id } });
    this.saveData();
  }
  doneTodo(id) {
    store.dispatch({ type: 'done', payload: { id: id } });
    this.saveData();
  }

  sortedTodo() {
    const todoList = store.getState().todoList.slice();
    return todoList.sort((a, b) => {
      return b.date.getTime() - a.date.getTime()
    });
  }

  render() {
    let components = [];
    this.state.todoList.forEach((todo) => {
      components.push(
        <TodoLabel
          key={todo.id}
          todo={todo}
          done={this.doneTodo}
          remove={this.removeTodo}
        />
      );
    });
    return (
      <div>
        <TodoInput
          add={this.addTodo}
        />
        {components}
      </div>
    );
  }

  componentDidMount() {
    // データの読み込み
    this.loadData();
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
  }
}

export default MyTodo;
