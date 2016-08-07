import fetch from 'isomorphic-fetch'
import loadGoogleMapsApi from 'load-google-maps-api'
import * as constants from '../constants'

export function initializeMaps() {
  return {
    type:'INIT_MAPS',
    payload: loadGoogleMapsApi({
      key:constants.API_KEY,
      libraries: ['geometry']
    })
  };
}



export function changeZipcode(zipcode) {
  return dispatch => {
    const isValidZip = /(^\d{5}$)/.test(zipcode);
    if(isValidZip) {
      dispatch(validateZip(zipcode, true))
      dispatch(fetchDist(zipcode))
    }
    else {
      dispatch(validateZip(zipcode, false))
    }
  }
}

export function changeAddress(address) {
  return (dispatch,getState) => {
    dispatch(requestAddr(address))
    const geocoder = getState().maps.geocoder
    const geocoderSearch = address + ' ' + getState().zipcode.zipSubmitted
    geocoder.geocode({address: geocoderSearch}, (results,status) => {
      if(status==='OK') {
        dispatch(changeCenter(results[0].geometry.location))
        dispatch(filterDist(results[0].geometry.location))
      }
      else {
        dispatch(validateAddr(false))
      }
    })
  }
}

function requestAddr(address) {
  return {
    type: 'ADDR_PENDING',
    address
  }
}

function validateAddr(valid, district) {
  if(valid) {
    return {
      type: 'ADDR_FOUND',
      distFound: [district,]
    }
  } else {
    return {
      type: 'ADDR_NOT_FOUND',
    }
  }
}

function filterDist(latLng) {
  return (dispatch,getState) => {
    const lat = latLng.lat()
    const lng = latLng.lng()
    const districts = getState().districts.distFound
    console.log(districts)
    const distParams = districts.map((dist) => { return dist.toString() })
    console.log(distParams)
    let distString = '';
    for(let dist in distParams) {
      distString += ('dist=' + distParams[dist] + '&')
    }
    let urlString = `http://district-finder-dev.us-west-2.elasticbeanstalk.com/pruneDist?` + distString
    urlString += `lng=${lng}&lat=${lat}`
    return fetch(urlString)
      .then(response => {
        if(response.status >= 400) {
          throw new Error('Failed to connect')
        } else {
          return response.json()
        }
      })
      .then(json => {
        dispatch(validateAddr(json!==null,json))})
  }

}

function fetchDist(zipcode) {
  return dispatch => {
    dispatch(requestDist())
    return fetch(`http://district-finder-dev.us-west-2.elasticbeanstalk.com/findDist/${zipcode}`)
      .then(response => {
        if(response.status >= 400) {
          throw new Error('Failed to connect')
        } else {
          return response.json()
        }
      })
      .then(json => {dispatch(receiveDist(json))})
  }
}

function requestDist() {
  return {
    type: 'DIST_PENDING'
  }
}

function failedDist() {
  return {
    type: 'DIST_REJECTED'
  }
}

function fulfillDist(json) {
  switch(Object.keys(json).length) {
    case 0:
      return {
        type: 'DIST_DNE'
      }
    case 1:
      return {
        type: 'DIST_FULFILLED',
        distFound: json
      }
    default:
      return {
        type: 'DIST_NEED_ADDR',
        distFound: json
      }
  }
} 

function changeCenter(center) {
  return {
    type: 'CHANGE_CENTER',
    center
  }
}

function receiveDist(json) {
  return (dispatch,getState) => {
    const geocoder = getState().maps.geocoder;
    const zipcode = getState().zipcode.zipSubmitted;
    geocoder.geocode({address: zipcode}, (results,status) => {
      dispatch(fulfillDist(json));
      if(status==='OK') {
        dispatch(changeCenter(results[0].geometry.location))
      }
      else {
        dispatch(validateZip(zipcode,false))
      }
    });
    
  }
} 


function validateZip(zipcode, valid) {
  if(valid) {
    return {
      type: 'VALID_ZIP',
      zipcode
    }
  }
  else {
    return {
      type: 'INVALID_ZIP',
      zipcode
    }
  }
}

