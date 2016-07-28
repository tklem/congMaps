import fetch from 'isomorphic-fetch'
import loadGoogleMapsApi from 'load-google-maps-api'


function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit))
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}

export function changeZipcode(zipCode) {
  return dispatch => {
    const isValidZip = /(^\d{5}$)/.test(zipCode);
    if(isValidZip) {
      dispatch(validateZip(zipCode, true))
      dispatch(fetchCoords(zipCode))
    }
    else {
      dispatch(validateZip(zipCode, false))
    }
  }
}

function fetchCoords(zipCode) {
  return dispatch => {
    dispatch(requestCoords())
    const settings = {
      mode: 'no-cors',
      timeout: 10000
    }
    return fetch(`http://localhost/stateDist/${zipCode}`)
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

function receiveCoords(json) {
  return {
    type: 'COORDS_FULFILLED',
    districts: json
  }
} 

function validateZip(zipCode, valid) {
  if(valid) {
    return {
      type: 'VALID_ZIP',
      zipCode
    }
  }
  else {
    return {
      type: 'INVALID_ZIP',
      zipCode
    }
  }
}



export function initializeMaps() {
  return {
    type:'INIT_MAPS',
    payload: loadGoogleMapsApi({
      key:'AIzaSyA29vc_lG5Rk4DqLE4yQrEtsuqPEZZxQbw'
    })
  };
}
