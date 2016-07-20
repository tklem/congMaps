import React, { Component, PropTypes } from 'react'
import GMap from './GMap.jsx'
import MapsAddrForm from './MapsAddrForm.jsx'
import { connect } from 'react-redux'

class DistrictFinder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {address, district} = this.props
    return (
      <div>
        <h1>Find your district!</h1>
        <GMap />
        <MapsAddrForm />
        <p>My district number is: {district}</p>
      </div>
    );
  }
}

DistrictFinder.propTypes = {
  district: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { district } = state.infoChange;
  return {
    district,
  };
};

export default connect(mapStateToProps)(DistrictFinder);

