import React from 'react';
import MyStorage from './service/Storage.js';
//import store from './store';

class MySetting extends React.Component {
  constructor(props) {
    super(props);

    const storage = new MyStorage();
    const dateType = storage.getNumber('dateType', 1);
    const dispYear = storage.getBool('dispYear', true);
    this.state = {
      dateType: dateType,
      dispYear: dispYear,
      dateType1String: dispYear ? 'YYYY年MM月DD日' : 'MM月DD日',
      dateType2String: dispYear ? 'YY/MM/DD' : 'MM/DD',
    };

    this.onSet = this.onSet.bind(this);
    this.selectDateType1 = this.selectDateType1.bind(this);
    this.selectDateType2 = this.selectDateType2.bind(this);
    this.changeCheckYear = this.changeCheckYear.bind(this);
  }

  onSet() {
    //store.dispatch({ type: 'setDateType', payload: { dateType: this.state.dateType } });
    //store.dispatch({ type: 'setDispYear', payload: { dispYear: this.state.dispYear } });

    const storage = new MyStorage();
    storage.setNumber('dateType', this.state.dateType);
    storage.setBool('dispYear', this.state.dispYear);

    window.location.href = '/';
  }
  selectDateType1() {
    this.setState({ dateType: 1 });
  }
  selectDateType2() {
    this.setState({ dateType: 2 });
  }
  changeCheckYear() {
    const dispYear = !this.state.dispYear;
    this.setState({
      dispYear: dispYear,
      dateType1String: dispYear ? 'YYYY年MM月DD日' : 'MM月DD日',
      dateType2String: dispYear ? 'YY/MM/DD' : 'MM/DD'
    });
  }

  render() {
    return (
      <div>
        <button style={{ width: '100%' }} onClick={this.onSet}>設定</button>
        <div style={{ marginTop: '10px' }}>
          <span>年月日表記:</span>
          <div>
            <input type="radio" id="date1" name="date" value="1" onChange={this.selectDateType1} checked={this.state.dateType === 1} />
            <label htmlFor="date1">{this.state.dateType1String}</label>
            <input type="radio" id="date2" name="date" value="2" onChange={this.selectDateType2} checked={this.state.dateType === 2} />
            <label htmlFor="date2">{this.state.dateType2String}</label>
          </div>
        </div>
        <div style={{ marginTop: '10px' }}>
          <input type="checkbox" id="disp-year" onChange={this.changeCheckYear} checked={this.state.dispYear} />
          <label htmlFor="disp-year">年を表示する</label>
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

export default MySetting;
