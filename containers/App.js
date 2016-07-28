import React, { Component, PropTypes } from 'react'
import GMap from '../components/GMap'
import MapsZipForm from '../components/MapsZipForm'
import { connect } from 'react-redux'

class DistrictFinder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Find your district!</h1>
        <GMap />
        <MapsZipForm />
      </div>
    );
  }
}

DistrictFinder.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DistrictFinder);