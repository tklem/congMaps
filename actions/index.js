import fetch from 'isomorphic-fetch'
import loadGoogleMapsApi from 'load-google-maps-api'

export function changeZipcode(zipcode) {
  return dispatch => {
    const isValidZip = /(^\d{5}$)/.test(zipcode);
    if(isValidZip) {
      dispatch(validateZip(zipcode, true))
      dispatch(fetchCoords(zipcode))
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
        console.log(results);
        dispatch(changeCenter(results[0].geometry.location, false))
      }
      else {
        dispatch(validateAddr(false))
      }
    })
  }
}

function requestAddr(address) {
  console.log(address)
  return {
    type: 'ADDR_PENDING',
    address
  }
}

function validateAddr(valid, district) {
  if(valid) {
    return {
      type: 'ADDR_FOUND',
      filter: district
    }
  } else {
    return {
      type: 'ADDR_NOT_FOUND',
    }
  }
}

export function filterDist(district) {
  if(district === '') {
    return validateAddr(false)
  } else {
    return validateAddr(true, district)
  }
}

function fetchCoords(zipcode) {
  return dispatch => {
    dispatch(requestCoords())
    return fetch(`http://localhost/stateDist/${zipcode}`)
      .then(response => {
        if(response.status >= 400) {
          throw new Error('Failed to connect')
        } else {
          return response.json()
        }
      })
      .then(json => {dispatch(receiveCoords(json))})
  }
}

function requestCoords() {
  return {
    type: 'COORDS_PENDING'
  }
}

function failedCoords() {
  return {
    type: 'COORDS_REJECTED'
  }
}

function fulfillCoords(json) {
  switch(Object.keys(json).length) {
    case 0:
      return {
        type: 'COORDS_DNE'
      }
    case 1:
      return {
        type: 'COORDS_FULFILLED',
        districts: json
      }
    default:
      return {
        type: 'COORDS_NEED_ADDR',
        districts: json
      }
  }
} 

function changeCenter(center, shouldUpdate) {
  return {
    type: 'CHANGE_CENTER',
    center,
    shouldUpdate
  }
}

function receiveCoords(json) {
  return (dispatch,getState) => {
    const geocoder = getState().maps.geocoder;
    const zipcode = getState().zipcode.zipSubmitted;
    geocoder.geocode({address: zipcode}, (results,status) => {
      dispatch(fulfillCoords(json));
      if(status==='OK') {
        dispatch(changeCenter(results[0].geometry.location,true))
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

export function initializeMaps() {
  return {
    type:'INIT_MAPS',
    payload: loadGoogleMapsApi({
      key:'AIzaSyA29vc_lG5Rk4DqLE4yQrEtsuqPEZZxQbw',
      libraries: ['geometry']
    })
  };
}

