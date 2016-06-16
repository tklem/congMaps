import React from 'react';
import ReactDOM from 'react-dom';


var GoogleMaps = React.createClass({
  getInitialState: function() {
    return {
      
    }
  },


  render: function() {
    return(
      <div id="map">
      </div>
    );
  }
});

var MapsAddrForm = React.createClass({
  getInitialState: function() {
    return {address: "An address"};
  },

  handleAddrChange: function(e) {
    this.setState({address: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var address = this.state.address.trim();
    //if(!address) {
    //  return;
    //}
    this.props.onAddrSubmit({address: address});
    this.setState({address: ""});
  },

  render: function() {
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
});

var GoogleMapsBox = React.createClass({
  getInitialState: function() {
    return( {address: ""});
  },

  handleAddrSubmit: function(location) {
    this.setState({address:location.address});
  },

  render: function() {
    return(
      <div class="mapsBox">
        <h1>Find your district!</h1>
        <GoogleMaps address={this.state.address} />
        <MapsAddrForm onAddrSubmit={this.handleAddrSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <GoogleMapsBox />,
  document.getElementById('content')
);