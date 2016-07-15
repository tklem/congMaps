import React from 'react';
import ReactDOM from 'react-dom';
import GMap from './GMaps.jsx';

class MapsAddrForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "An address"
    };
    this.handleAddrChange = this.handleAddrChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.render = this.render.bind(this);
  }

  handleAddrChange(e) {
    this.setState({address: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var address = this.state.address.trim();
    if(!address) {
      return;
    }
    this.props.onAddrSubmit({address: address});
    this.setState({address: ""});
  }

  render() {
    return (
      <form className="addrForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your address"
          value={this.state.address}
          onChange={this.handleAddrChange}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class DistrictFinder extends React.Component {
  constructor() {
    super();
    this.state = {
      address: "",
      distNumber: ""
    };
    this.handleAddrSubmit = this.handleAddrSubmit.bind(this);
    this.handleDistChange = this.handleDistChange.bind(this);
  }
  
  handleAddrSubmit(location) {
    this.setState({address:location.address});
  }
  
  handleDistChange(district) {
    this.setState({distNumber: district});
  }

  render() {
    return (
      <div class="GMaps">
        <h1>Find your district!</h1>
        <GMap address={this.state.address} onDistChange={this.handleDistChange}/>
        <MapsAddrForm onAddrSubmit={this.handleAddrSubmit} />
        <p>My district number is: {this.state.distNumber}</p>
      </div>
    );
  }
}

export default DistrictFinder;