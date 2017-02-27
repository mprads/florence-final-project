import React, { Component } from 'react';

import RequestButton from './request-button.component.jsx';
import ChooseBed from './choose-bed.component.jsx'

import axios from 'axios';

class Bed extends Component {
  constructor(props){
    super(props);
    this.state = {
    };

    // this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {

    // this.ws = new WebSocket('ws://localhost:4000/');
    // This handles a new message from server
    // this.ws.onmessage = (event) => {
    // }
    this.serverRequest =
      axios ({
        method: "get",
        url: "http://localhost:8080/api/beds",
        responseType: 'json', // default
        withCredentials: false // default
      })
      .then(function(result) {
        console.log(result)
      })
  }
        // <RequestButton />
  render(){
    return (
      <div>
        <ChooseBed />
      </div>
    );
  }
}

export default Bed