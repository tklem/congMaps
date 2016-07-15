import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initializeMaps, changeAddress, changeLatLng, changeDistrict } from '../actions/index.jsx';


const SPRINGFIELD_POSITION = {
  lat: 39.7817,
  lng: -89.6501
};

class GMap extends Component {
  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
    this.initGeocode = this.initGeocode.bind(this);
  }
  
  componentDidMount() {
    const { fetchingMaps, mapsLoaded, dispatch, initialize } = this.props;
    if (!fetchingMaps || !mapsLoaded) {
      dispatch(initializeMaps());
    }
    else {
      this.initMap();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { mapsLoaded } = nextProps;
    if (!this.props.mapsLoaded && mapsLoaded) { // load finished
      this.initMap();
    }
    else if (mapsLoaded && this.mapsLoaded) {
      this.initGeocode(nextProps);
    }
  }

  initGeocode(nextProps) {
    this.geocoder.geocode({address:nextProps.address}, (results,status) => {
      if(status == this.props.mapService.GeocoderStatus.OK) {
        console.log("Component props received.");
        dispatch(changeAddress(nextProps.address));
        dispatch(changeLatLng(results[0].geometry.location));
        this.map.setCenter(results[0].geometry.location);
        this.map.setZoom(14);
        this.marker.setMap(null);
        this.marker = this.props.mapsService.Marker({
           position: results[0].geometry.location,
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

  initMap() {
    const { mapService } = this.props;
    this.map = new mapService.Map(this.refs.map, {
      center: this.props.latLng,
      zoom: 6,
      mapTypeId: mapService.ROADMAP,
    });
    this.geocoder = new mapService.Geocoder();
    this.marker = new mapService.Marker({});
    this.congLayer = new mapService.KmlLayer({
      url: 'http://www.google.com/maps/d/u/0/kml?mid=1g4GcUoUk9gcYd5ZNHdW3gOFTdAk',
      suppressInfoWindows: true,
      map: this.map
    });
    this.congLayer.addListener('click', (kmlEvent) => {
      console.log('Got clicked');
      let congNumber = kmlEvent.featureData.name;
      dispatch(changeDistrict(congNumber));
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

GMap.propTypes = {
  address: PropTypes.string.isRequired,
  fetchingMaps: PropTypes.bool.isRequired,
  mapsLoaded: PropTypes.bool.isRequired,
  latLng: PropTypes.object.isRequired,
  mapService: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {address, latLng} = state.infoChange;
  const {fetchingMaps,mapsLoaded,mapService} = state.createMap;
  return {
    address,
    fetchingMaps,
    mapsLoaded,
    mapService,
    latLng
  };
};

export default connect(mapStateToProps)(GMap);