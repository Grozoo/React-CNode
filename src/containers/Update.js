import React, { Component } from 'react';

class Update extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    fetch(``);
  }
  render() {
    console.log(`Update`);
    return <div>edit</div>;
  }
}

export default Update;
