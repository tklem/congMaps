import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand style={{fontSize:'200%'}}>
            Illinois District Finder
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    )
  }
}

export default connect()(Header)