import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { initializeMaps } from '../actions';

const SPRINGFIELD_POSITION = {
  lat: 37.2090,
  lng: -93.2923
}

class GMap extends React.Component {
  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
    this.addDist = this.addDist.bind(this);
  }
  
  componentDidMount() {
    const { fetchingMaps, mapsLoaded, dispatch } = this.props;
    dispatch(initializeMaps());
    if (!fetchingMaps && mapsLoaded) {
      this.initMap();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchingMaps, mapsLoaded, distMap, succeedCoords } = nextProps;
    if (!fetchingMaps && mapsLoaded && !distMap) {
      this.initMap();
    }
    if(succeedCoords && distMap) {
      this.addDist(distMap);
    }
  }

  initMap() {
    this.map = new google.maps.Map(this.refs.map, {
      center: SPRINGFIELD_POSITION,
      zoom: 8,
      mapTypeId: google.maps.ROADMAP,
    });
    this.geocoder = new google.maps.Geocoder();
    this.marker = new google.maps.Marker({});
  }

  addDist(distMap) {
    const { zipSubmitted } = this.props;
    this.geocoder.geocode({address: zipSubmitted}, (results, status) => {
      if(status==='OK') {
        this.map.panTo(results[0].geometry.location);
        this.map.setZoom(12);
        if(this.marker) {
          this.marker.setMap(null);
        }
        this.marker = new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location,
        })
      }
    });
    this.polyArray = {};
    let distGroup = '(';
    for(let distNumber in distMap) {
      let boundary = distMap[distNumber];
      let mapBoundary = new google.maps.Polygon({
        paths: boundary,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });
      this.polyArray[distNumber] = mapBoundary;
      distGroup += (distNumber + ',');
    }
    distGroup = distGroup.slice(0,-1);
    distGroup = ('name IN ' + distGroup + ')');
    console.log(distGroup);
    if(this.ftLayer) {
      this.ftLayer.setMap(null);
    }
    let ftQuery = {
      from: '15_E5AfGNXK2JhLwhm2p3Cjxsxz1oC2SCYXRiGnTi',
      select: 'geometry',
      where: distGroup
    }
    this.ftLayer = new google.maps.FusionTablesLayer({
      map: this.map,
      query: ftQuery
    })

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
  fetchingMaps: PropTypes.bool.isRequired,
  mapsLoaded: PropTypes.bool.isRequired,
  succeedCoords: PropTypes.bool.isRequired,
  distMap: PropTypes.object,
  zipSubmitted: PropTypes.string
}

function mapStateToProps(state) {
  const { maps, coords, validateZip } = state
  const { fetchingMaps, mapsLoaded } = maps
  const { zipSubmitted } = validateZip
  const { distMap, succeedCoords } = coords
  return { fetchingMaps, mapsLoaded, distMap, zipSubmitted, succeedCoords }
}

export default connect(mapStateToProps)(GMap)