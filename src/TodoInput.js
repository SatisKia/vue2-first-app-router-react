import './TodoInput.css';
import React from 'react';

class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      colorType: 0,
      isError: false
    };

    this.onAdd = this.onAdd.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onAdd() {
    const input1 = document.getElementById('color1');
    const input2 = document.getElementById('color2');
    const input3 = document.getElementById('color3');
    let color = input1.value;
    if (input2.checked) {
      color = input2.value;
    } else if (input3.checked) {
      color = input3.value;
    }
    this.props.add(this.state.text, color);
    this.setState({ text: '' });
    document.getElementById("text").value = '';
  }

  onChangeText() {
    const newVal = document.getElementById("text").value;
    this.setState({ text: newVal });
    if (newVal.length > 100) {
      this.setState({ isError: true });
    } else {
      this.setState({ isError: false });
    }
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <span>TODO:</span>
          </div>
          <div style={{ width: '50%', textAlign: 'right' }} onClick={() => { window.location.href = "/setting"; }}>設定</div>
        </div>
        <input id="text" type="text" className="input" onChange={this.onChangeText} placeholder="100文字まで" />
        <div>
          <input type="radio" id="color1" name="color" value="#80ffff" checked={this.state.colorType === 0} onChange={() => { this.setState({ colorType: 0 }) }} />
          <label htmlFor="color1">シアン</label>
          <input type="radio" id="color2" name="color" value="#ff80ff" checked={this.state.colorType === 1} onChange={() => { this.setState({ colorType: 1 }) }} />
          <label htmlFor="color2">マゼンタ</label>
          <input type="radio" id="color3" name="color" value="#ffff80" checked={this.state.colorType === 2} onChange={() => { this.setState({ colorType: 2 }) }} />
          <label htmlFor="color3">イエロー</label>
        </div>
        <div style={{ display: (this.state.isError ? "none" : "block") }}>
          <button style={{ width: '100%' }} onClick={this.onAdd} disabled={(this.state.text.length === 0) || this.state.isError}>登録</button>
        </div>
        <div style={{ display: (this.state.isError ? "block" : "none") }}>
          <span className="error">入力できる文字は100文字までです</span>
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

export default TodoInput;
