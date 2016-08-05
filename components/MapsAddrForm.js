import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectReddit, changeAddress } from '../actions'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'

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
    const { addrSubmitted, addrFound, addrPending, loadingDist } = this.props

    return (
      <div style={{margin:'1em'}}>
        <Form inline className="text-center" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formInlineAddr" bsSize="large">
            <FormControl
              type="text"
              placeholder="Your street address"
              className="form-control"
              value={this.state.streetField}
              onChange={this.handleStreetChange}
            />
          </FormGroup>
          {' '}
          <FormGroup controlId="forInlineCity" bsSize="large">
            <FormControl
              type="text"
              placeholder="Your city"
              className="form-control"
              value={this.state.cityField}
              onChange={this.handleCityChange}
            />
          </FormGroup>
          {' '}
          <Button 
            type="submit" 
            bsStyle="primary"
            bsSize="large"
            disabled={addrPending || loadingDist}>
            Submit
          </Button>
        </Form>
        <p> {!addrFound && `The address you submitted was not found in your zipcode!`} </p>
      </div>
    );
  }
}


MapsAddrForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addrSubmitted: PropTypes.string.isRequired,
  addrFound: PropTypes.bool.isRequired,
  addrPending: PropTypes.bool.isRequired,
  loadingDist: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { address, districts } = state
  const { addrSubmitted, addrFound, addrPending } = address
  const { loadingDist } = districts
  return { addrSubmitted, addrFound, addrPending, loadingDist }
}

export default connect(mapStateToProps)(MapsAddrForm);