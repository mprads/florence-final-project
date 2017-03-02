import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ButtonSet from './button-set.component.jsx';
import NoPatient from './no-patient.component.jsx';

class RequestButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.emergencyRequest = this.emergencyRequest.bind(this);
  }

  handleRequest(event) {
    this.props.changeViewState('requestForm');
  }

  emergencyRequest() {
    this.props.changeRequestState({request_type_id: 5}, () => {
      this.props.postRequest();
    });
    this.props.changeViewState('requestPending');
  }

  componentWillMount() {
    this.props.getPatientInfo();
  }

  componentDidMount() {
  }

  render() {
    if (this.props.requestState.patient_id) {
      return (
        <ButtonSet handleRequest={this.handleRequest} emergencyRequest={this.emergencyRequest}/>
      );
    } else {
      return (
        <NoPatient/>
      );
    }
  }
}

export default RequestButton
