import React from 'react';
import ReactDOM from 'react-dom';

const SPRINGFIELD_POSITION = {
  lat: 39.7817,
  lng: -89.6501
};

class GMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ""
    }
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.render = this.render.bind(this);
  }
  
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: SPRINGFIELD_POSITION,
      zoom: 6,
      mapTypeId: google.maps.ROADMAP,
    });
    this.geocoder = new google.maps.Geocoder();
    this.marker = new google.maps.Marker({});
    console.log("Component mounted.");
  }

  componentWillReceiveProps(nextProps) {
    this.geocoder.geocode({address:nextProps.address}, (results,status) => {
      if(status == google.maps.GeocoderStatus.OK) {
        console.log("Component props received.");
        this.state.address = nextProps.address;
        this.map.setCenter(results[0].geometry.location);
        this.map.setZoom(6);
        this.marker.setMap(null);
        this.marker = new google.maps.Marker({
          position: results[0].geometry.location,
          title: "Hello world!"
        });
        this.marker.setMap(this.map);
      }
      else {
        console.log("No update.");
        console.log(nextProps.address);
        console.log(status);
        console.log("^ address");
      }
    });
  }

  render() {
    const mapStyle = {
      width: 800,
      height: 600,
      border: '1px solid black',
      display: 'block'
    };
    
    return (
      <div>
        <div ref="map" style={mapStyle}></div>
      </div>
    );
  }
}

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
      address: ""
    };
    this.handleAddrSubmit = this.handleAddrSubmit.bind(this);
  }
  
  handleAddrSubmit(location) {
    this.setState({address:location.address});
  }
  
  render() {
    return (
      <div class="GMaps">
        <h1>Find your district!</h1>
        <GMap address={this.state.address} />
        <MapsAddrForm onAddrSubmit={this.handleAddrSubmit} />
      </div>
    );
  }
}

export default DistrictFinder;