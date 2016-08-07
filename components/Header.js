import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/lib/Navbar'
import Col from 'react-bootstrap/lib/Col'

class Header extends React.Component {
  render() {
    return (
      <Navbar inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <p style={{fontSize: '200%'}}>Illinois District Finder</p>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    )
  }
}

export default connect()(Header)