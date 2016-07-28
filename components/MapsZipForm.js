import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectReddit, changeZipcode } from '../actions'

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
    this.setState({zipField: ""});
  }

  render() {
    const { zipSubmitted, validZip, loadingCoords } = this.props
    return (
      <div>
        <form className="zipForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Your zipcode"
            value={this.state.zipField}
            onChange={this.handleZipChange}
          />
          <input 
            type="submit" 
            value="Submit"
            
          />
        </form>
        <p> {!validZip && `${zipSubmitted} is not a valid zipcode!`} </p>
      </div>
    );
  }
}

MapsZipForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  zipSubmitted: PropTypes.string.isRequired,
  validZip: PropTypes.bool.isRequired,
  loadingCoords: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { validateZip, coords } = state
  const { zipSubmitted, validZip } = validateZip
  const { loadingCoords } = coords
  return { zipSubmitted, validZip, loadingCoords }
}

export default connect(mapStateToProps)(MapsZipForm);