import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeAddress } from '../actions/index.jsx';

class MapsAddrForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressField: ""
    };
    this.handleAddrChange = this.handleAddrChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddrChange(e) {
    this.setState({addressField: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var address = this.state.addressField.trim();
    if(!address) {
      return;
    }
    const { dispatch } = this.props;
    dispatch(changeAddress(this.state.addressField));
    this.setState({addressField: ""});
  }

  render() {
    return (
      <form className="addrForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your address"
          value={this.state.addressField}
          onChange={this.handleAddrChange}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

MapsAddrForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(MapsAddrForm);