import React, { Component, PropTypes } from 'react'
import GMap from './GMap.jsx'
import MapsAddrForm from './MapsAddrForm.jsx'
import { connect } from 'react-redux'
import { changeAddress } from '../actions/index.jsx'

class DistrictFinder extends Component {
  constructor(props) {
    super(props);
    this.handleAddrSubmit = this.handleAddrSubmit.bind(this);
  }

  handleAddrSubmit(data) {
    const { dispatch } = this.props;
    console.log("Address received: " + data["address"]);
    dispatch(changeAddress(data["address"]));
  }

  render() {
    const {address, district} = this.props
    return (
      <div class="GMaps">
        <h1>Find your district!</h1>
        <GMap/>
        <MapsAddrForm onSubmit={this.handleAddrSubmit} />
        <p>My district number is: {district}</p>
      </div>
    );
  }
}

DistrictFinder.propTypes = {
  district: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { district } = state.infoChange;

  return {
    district
  };
};

export default connect(mapStateToProps)(DistrictFinder);

