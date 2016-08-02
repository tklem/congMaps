import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectReddit, changeAddress } from '../actions'

class MapsAddrForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streetField: "",
      cityField: ""
    };
    this.handleStreetChange = this.handleStreetChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStreetChange(e) {
    this.setState({streetField: e.target.value});
  }

  handleCityChange(e) {
    this.setState({cityField: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let street = this.state.streetField.trim();
    let city = this.state.cityField.trim();
    if(!street) {
      return;
    }
    const { dispatch } = this.props;
    const address = street + ' ' + city;
    dispatch(changeAddress(address));
  }

  render() {
    const { addrSubmitted, addrFound, addrPending } = this.props
    return (
      <div>
        <form className="addrForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Your street address"
            value={this.state.streetField}
            onChange={this.handleStreetChange}
          />
          <input
            type="text"
            placeholder="Your city"
            value={this.state.cityField}
            onChange={this.handleCityChange}
          />
          <input 
            type="submit" 
            value="Submit"
            disabled={addrPending}
          />
        </form>
        <p> {!addrFound && `The address you submitted was not found in your zipcode!`} </p>
      </div>
    );
  }
}

MapsAddrForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addrSubmitted: PropTypes.string.isRequired,
  addrFound: PropTypes.bool.isRequired,
  addrPending: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { address } = state
  const { addrSubmitted, addrFound, addrPending } = address
  return { addrSubmitted, addrFound, addrPending }
}

export default connect(mapStateToProps)(MapsAddrForm);