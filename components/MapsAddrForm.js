import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectReddit, changeAddress } from '../actions'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import Row from 'react-bootstrap/lib/Row'
import Alert from 'react-bootstrap/lib/Alert'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

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
      <div>
        <Row style={{margin:'1em', marginTop: '2em', borderTop:'1px solid gray'}}>
          <p className="text-center lead" style={{margin:'1em'}}>
            Your zipcode contains more than one district. <br/>
            Please enter your address and city.
          </p>
        </Row>

        <Form inline className="text-center" onSubmit={this.handleSubmit}>
          <Row style={{margin:'1em'}}>
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
          </Row>
          {' '}
          <Row style={{margin:'1em'}}>
            <Button 
              type="submit" 
              bsStyle="primary"
              bsSize="large"
              disabled={addrPending || loadingDist}>
              {(addrPending || loadingDist) ? 'Loading...' : 'Submit'}
            </Button>
          </Row>
        </Form>
        {!addrFound &&
          <Row style={{margin: '1em'}}>
            <Alert bsStyle="danger" style={{margin: '1em'}}>
              <Glyphicon glyph="minus-sign"/>
              The address you submitted was not found in your zipcode!
            </Alert>
          </Row>
        }
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