import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

const SPRINGFIELD_POSITION = {
  lat: 39.7817,
  lng: -89.6501
};

class GMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      latLng: SPRINGFIELD_POSITION
    }
    this.initMap = this.initMap.bind(this);
    this.initGeocode = this.initGeocode.bind(this);
  }
  
  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.initMap();
    }
    console.log('isScriptLoaded:' + isScriptLoaded);
    console.log('isScriptLoadSucceed' + isScriptLoadSucceed);
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;
    if (isScriptLoaded && !this.props.isScriptLoaded && isScriptLoadSucceed) { // load finished
      this.initMap();
    }
    else if (isScriptLoaded && this.props.isScriptLoaded && isScriptLoadSucceed) {
      this.initGeocode(nextProps);
    }
  }

  initGeocode(nextProps) {
    this.geocoder.geocode({address:nextProps.address}, (results,status) => {
      if(status == google.maps.GeocoderStatus.OK) {
        console.log("Component props received.");
        this.state.address = nextProps.address;
        this.state.latLng = results[0].geometry.location;
        this.map.setCenter(this.state.latLng);
        this.map.setZoom(14);
        this.marker.setMap(null);
        this.marker = new google.maps.Marker({
           position: this.state.latLng,
        });
        this.marker.setMap(this.map);
        google.maps.event.trigger(this.marker, 'click');
      }
      else {
        console.log("No update.");
        console.log(nextProps.address);
        console.log(status);
        console.log("^ address");
      }
    });
  }

  initMap() {
    this.map = new google.maps.Map(this.refs.map, {
      center: this.state.latLng,
      zoom: 6,
      mapTypeId: google.maps.ROADMAP,
    });
    this.geocoder = new google.maps.Geocoder();
    this.marker = new google.maps.Marker({});
    this.congLayer = new google.maps.KmlLayer({
      url: 'http://www.google.com/maps/d/u/0/kml?mid=1g4GcUoUk9gcYd5ZNHdW3gOFTdAk',
      suppressInfoWindows: true,
      map: this.map
    });
    this.congLayer.addListener('click', (kmlEvent) => {
      console.log('Got clicked');
      while(this.congLayer.getStatus() !== google.maps.KmlLayerStatus.OK) {
        setTimeout(function() {console.log(this.congLayer.getStatus())}, 1000);
      }
      let congNumber = kmlEvent.featureData.name;
      this.props.onDistChange(congNumber);
    });
    console.log("Component mounted.");
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

export default scriptLoader(
  'https://maps.googleapis.com/maps/api/js?v=3.24&key=AIzaSyA29vc_lG5Rk4DqLE4yQrEtsuqPEZZxQbw'
)(GMap);