import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { initializeMaps, filterDist } from '../actions';

class GMap extends React.Component {
  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
    this.addDist = this.addDist.bind(this);
    this.findDist = this.findDist.bind(this);
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
      distMap, 
      succeedCoords, 
      center, 
      shouldUpdate, 
      zipExist,
      pruneDist, filterDist
    } = nextProps;

    if (!fetchingMaps && mapsLoaded && !distMap) {
      this.initMap(center);
    }
    if(succeedCoords && distMap && zipExist && shouldUpdate) {
      this.addDist(distMap, center, pruneDist, filterDist);
    }
    if(!shouldUpdate) {
      this.findDist(distMap, center);
    }
  }

  initMap(nextCenter) {
    this.map = new google.maps.Map(this.refs.map, {
      center: nextCenter,
      zoom: 8,
    });
    this.marker = new google.maps.Marker({
      map: this.map
    });
    this.ftLayer = new google.maps.FusionTablesLayer({
      map: this.map
    })
  }

  addDist(distMap, center, pruneDist, filterDist) {
    this.map.setCenter(center);
    this.marker.setPosition(center);
    let distGroup = '(';
    if(pruneDist) {
      distGroup += (filterDist + ',');
    } 
    else {
      for(let distNumber in distMap) {
        distGroup += (distNumber + ',');
      }
    }
    distGroup = distGroup.slice(0,-1);
    distGroup = ('name IN ' + distGroup + ')');
    let ftQuery = {
      from: '15_E5AfGNXK2JhLwhm2p3Cjxsxz1oC2SCYXRiGnTi',
      select: 'geometry',
      where: distGroup
    };
    this.ftLayer.setOptions({query: ftQuery});

  }

  findDist(distMap, center) {
    let geomMap = {}
    for(let distNumber in distMap) {
      geomMap[distNumber] = new google.maps.Polygon({
        paths: distMap[distNumber]
      })
    }
    console.log(geomMap);
    let containingDist = '';
    for(let geomNumber in geomMap) {
      let inPoly = google.maps.geometry.poly.containsLocation(center, geomMap[geomNumber])
      console.log(inPoly)
      if(inPoly) {
        containingDist = geomNumber;
        break;
      }
    }
    console.log(containingDist)
    const { dispatch } = this.props
    dispatch(filterDist(containingDist))
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
  zipExist: PropTypes.bool.isRequired,
  distMap: PropTypes.object,
  center: PropTypes.object.isRequired,
  zipSubmitted: PropTypes.string
}

function mapStateToProps(state) {
  const { maps, coords, zipcode } = state
  const { fetchingMaps, mapsLoaded, center, shouldUpdate } = maps
  const { zipSubmitted, zipExist } = zipcode
  const { distMap, succeedCoords, pruneDist, filterDist } = coords
  return { 
    fetchingMaps, 
    mapsLoaded, 
    distMap, 
    zipSubmitted, 
    shouldUpdate, 
    succeedCoords, 
    center, 
    zipExist,
    pruneDist,
    filterDist
  }
}

export default connect(mapStateToProps)(GMap)