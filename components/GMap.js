import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { initializeMaps } from '../actions';

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
    const { 
      fetchingMaps, 
      mapsLoaded, 
      distFound, 
      succeedDist, 
      center, 
      zipExist
    } = nextProps;

    if (!fetchingMaps && mapsLoaded && !distFound.length) {
      this.initMap(center);
    }
    if(succeedDist && distFound.length && zipExist) {
      this.addDist(distFound, center);
    }
  }

  initMap(nextCenter) {
    this.map = new google.maps.Map(this.refs.map, {
      center: nextCenter,
      zoom: 5,
    });
    this.marker = new google.maps.Marker({
      map: this.map
    });
    this.ftLayer = new google.maps.FusionTablesLayer({
      map: this.map
    })
  }

  addDist(distFound, center) {
    this.map.setCenter(center);
    this.map.setZoom(11);
    this.marker.setPosition(center);
    let distGroup = '('; 
    for(let distNumber in distFound) {
      distGroup += (distFound[distNumber] + ',');
    }
    distGroup = distGroup.slice(0,-1);
    distGroup = ('name IN ' + distGroup + ')');
    console.log(distGroup)
    let ftQuery = {
      from: '15_E5AfGNXK2JhLwhm2p3Cjxsxz1oC2SCYXRiGnTi',
      select: 'geometry',
      where: distGroup
    };
    this.ftLayer.setOptions({query: ftQuery});

  }

  render() {
    const mapStyle = {
      width: '60em',
      height: '45em',
      border: '1px solid black',
      display: 'block',
      margin: '0px auto'
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
  succeedDist: PropTypes.bool.isRequired,
  zipExist: PropTypes.bool.isRequired,
  distFound: PropTypes.array,
  center: PropTypes.object.isRequired,
  zipSubmitted: PropTypes.string
}

function mapStateToProps(state) {
  const { maps, districts, zipcode } = state
  const { fetchingMaps, mapsLoaded, center } = maps
  const { zipSubmitted, zipExist } = zipcode
  const { distFound, succeedDist } = districts
  return { 
    fetchingMaps, 
    mapsLoaded, 
    distFound, 
    zipSubmitted, 
    succeedDist, 
    center, 
    zipExist
  }
}

export default connect(mapStateToProps)(GMap)