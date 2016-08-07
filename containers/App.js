import React, { Component, PropTypes } from 'react'
import GMap from '../components/GMap'
import MapsZipForm from '../components/MapsZipForm'
import MapsAddrForm from '../components/MapsAddrForm'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import DistrictNotice from '../components/DistrictNotice'

class DistrictFinder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { addrNeeded, distFound } = this.props;
    return (
      <div>
        <Header />
        <Col xs={12} md={4}>
          <MapsZipForm />
          {addrNeeded && <MapsAddrForm />}
          {distFound.length === 1 && <DistrictNotice/>}
        </Col>
        <Col xs={12} md={8}>  
          <GMap />
        </Col>
      </div>
    );
  }
}

DistrictFinder.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addrNeeded: PropTypes.bool.isRequired,
  distFound: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { address, districts } = state;
  const { addrNeeded } = address
  const { distFound } = districts
  return {addrNeeded, distFound}
}

export default connect(mapStateToProps)(DistrictFinder);