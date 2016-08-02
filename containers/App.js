import React, { Component, PropTypes } from 'react'
import GMap from '../components/GMap'
import MapsZipForm from '../components/MapsZipForm'
import MapsAddrForm from '../components/MapsAddrForm'
import { connect } from 'react-redux'

class DistrictFinder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { addrNeeded } = this.props;
    return (
      <div>
        <h1>Find your district!</h1>
        <GMap />
        <MapsZipForm />
        {addrNeeded && <MapsAddrForm />}
      </div>
    );
  }
}

DistrictFinder.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addrNeeded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { address } = state;
  const { addrNeeded } = address
  return {addrNeeded}
}

export default connect(mapStateToProps)(DistrictFinder);