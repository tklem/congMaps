import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectReddit, changeZipcode } from '../actions'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import Alert from 'react-bootstrap/lib/Alert'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Row from 'react-bootstrap/lib/Row'

class MapsZipForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipField: ""
    };
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleZipChange(e) {
    this.setState({zipField: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var zip = this.state.zipField.trim();
    if(!zip) {
      return;
    }
    const { dispatch } = this.props;
    dispatch(changeZipcode(zip));
  }

  render() {
    const { validZip, loadingDist, addrPending, zipExist } = this.props

    const margin = {
      margin: '1em'
    }

    return (
      <div>
        <p className="text-center lead">Get started by entering your zipcode below.</p>
        <Row style={margin}>
          <Form inline onSubmit={this.handleSubmit} className="text-center">
            <FormGroup controlId="formInlineZip" bsSize="large">
              <FormControl
                type="text"
                placeholder="Your zipcode"
                className="form-control"
                value={this.state.zipField}
                onChange={this.handleZipChange}
              />
            </FormGroup>
            {' '}
            <Button bsStyle="primary" bsSize="large" type="submit" disabled={loadingDist || addrPending}>
              {(addrPending || loadingDist) ? 'Loading...' : 'Submit'}
            </Button>
          </Form>
          {!validZip && 
            <Alert bsStyle="danger" style={margin}>
              <Glyphicon glyph="minus-sign"/> Please enter a valid zipcode.
            </Alert>
          }
          {!zipExist && 
            <Alert bsStyle="danger" style={margin}>
              <Glyphicon glyph="minus-sign"/> Sorry, that zipcode is not supported right now.
            </Alert>
          }
        </Row>
      </div>
    );
  }
}

MapsZipForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  zipSubmitted: PropTypes.string.isRequired,
  validZip: PropTypes.bool.isRequired,
  zipExist: PropTypes.bool.isRequired,
  loadingDist: PropTypes.bool.isRequired,
  addrPending: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { zipcode, districts, address } = state
  const { zipSubmitted, validZip, zipExist } = zipcode
  const { loadingDist } = districts
  const { addrPending } = address
  return { zipSubmitted, validZip, loadingDist, addrPending, zipExist }
}

export default connect(mapStateToProps)(MapsZipForm);