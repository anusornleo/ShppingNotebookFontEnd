import React, { Component } from 'react';
import Contacts from './component/contracts';
import axios from 'axios';

class App extends Component {
  state = {
    notebooks: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/notebook`)
      .then(res => {
        const notebooks = res.data;
        this.setState({ notebooks });
      })
  }
  
  render() {
    return (
      <Contacts notebooks={this.state.notebooks} />
    )
  }
}

export default App;
