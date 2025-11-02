import './TodoLabel.css';
import React from 'react';
import store from './store';

class TodoLabel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: this.props.todo.done
    };

    this.done = this.done.bind(this);
    this.remove = this.remove.bind(this);
    this.date = this.date.bind(this);
  }

  keta(value) {
    if (value >= 100) {
      return '' + (value % 100);
    }
    return ((value < 10) ? '0' : '') + value;
  }

  done() {
    if (this.props.todo) {
      this.props.done(this.props.todo.id);
    }

    this.setState({ done: this.props.todo.done });
  }
  remove() {
    if (this.props.todo) {
      this.props.remove(this.props.todo.id);
    }
  }

  date() {
    if (!this.props.todo) return '';
    const { date } = this.props.todo;
    if (store.getState().dispYear) {
      if (store.getState().dateType === 1) {
        return '' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
      } else {
        return '' + this.keta(date.getFullYear()) + '/' + this.keta(date.getMonth() + 1) + '/' + this.keta(date.getDate());
      }
    } else {
      if (store.getState().dateType === 1) {
        return '' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
      } else {
        return '' + this.keta(date.getMonth() + 1) + '/' + this.keta(date.getDate());
      }
    }
  }

  render() {
    const backgroundColor = this.state.done ? '#808080' : this.props.todo.color;

    return (
      <div className="label" style={{ backgroundColor: backgroundColor }}>
        <div style={{ width: '100%' }}>
          <table className="table">
            <tbody>
              <tr>
                <td className="td" style={{ width: '5%' }}>
                  <input type="checkbox" checked={this.state.done ? true : false} onChange={this.done} />
                </td>
                <td className="td" style={{ width: '20%' }}>
                  <span>{this.date()}</span>
                </td>
                <td className="td" style={{ width: '65%' }}>
                  <span>{this.props.todo.text}</span>
                </td>
                <td className="td" style={{ width: '10%' }}>
                  <button style={{ display: this.state.done ? "block" : "none", width: '100%', border: '0', backgroundColor: backgroundColor }} onClick={this.remove}>消</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
  }
}

export default TodoLabel;
