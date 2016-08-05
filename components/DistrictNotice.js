import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Alert } from 'react-bootstrap';

class DistrictNotice extends React.Component {
  render() {
    const { district } = this.props
    return (
      <div>
        <Row style={{margin:'1em',marginTop: '2em', borderTop:'1px solid gray'}}>
          <Alert bsStyle="success" style={{margin:'1em'}}>
            {' '}<h3>Your Illinois lower house district number is {district}.</h3>
          </Alert>
        </Row>
        <Row style={{margin:'1em'}}>
          <p className="text-center lead">
            Like it? Contribute to the <a href="#">GitHub</a>.
          </p>
        </Row>
      </div>
    )
  }
}

DistrictNotice.propTypes = {
  district: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const district = state.districts.distFound[0]
  return { district }
}

export default connect(mapStateToProps)(DistrictNotice)