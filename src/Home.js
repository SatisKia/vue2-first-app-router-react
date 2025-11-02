import React from 'react';
import MyTodo from './MyTodo';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MyTodo />
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
  }
}

export default Home;
