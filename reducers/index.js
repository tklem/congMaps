import { combineReducers } from 'redux'

const SPRINGFIELD_POSITION = {
  lat: 37.2090,
  lng: -93.2923
}

function address(state = {
  addrNeeded: false,
  addrSubmitted: "",
  addrPending: false,
  addrFound: true
}, action) {
  switch(action.type) {
    case 'DIST_FULFILLED':
      return Object.assign({}, state, {
        addrNeeded: false
      })

    case 'DIST_NEED_ADDR':
      return Object.assign({}, state, {
        addrNeeded: true
      })
    case 'ADDR_PENDING':
      return Object.assign({}, state, {
        addrPending: true,
        addrSubmitted: action.address
      })
    case 'ADDR_FOUND':
      return Object.assign({}, state, {
        addrPending: false,
        addrFound: true,
      })
    case 'ADDR_NOT_FOUND':
      return Object.assign({}, state, {
        addrPending: false,
        addrFound: false,
      })
    default: return state
  }
}

function maps(state = {
  fetchingMaps: false,
  mapsLoaded: false,
  center: SPRINGFIELD_POSITION,
  geocoder: null
}, action) {
  switch(action.type) {
    case 'INIT_MAPS_PENDING':
      return Object.assign({}, state, {
        fetchingMaps: true,
        mapsLoaded: false
      })
    case 'INIT_MAPS_FULFILLED':
      return Object.assign({}, state, {
        fetchingMaps: false,
        mapsLoaded: true,
        geocoder: new google.maps.Geocoder()
      })
    case 'CHANGE_CENTER':
      return Object.assign({}, state, {
        center: action.center,
        shouldUpdate: action.shouldUpdate
      })
    case 'ADDR_FOUND':
    case 'ADDR_NOT_FOUND':
      return Object.assign({}, state, {
        shouldUpdate: true
      })
    case 'INIT_MAPS_REJECTED':
    default:
      return state
  }
}

function zipcode(state = {
  zipSubmitted: "",
  validZip: true,
  zipExist: true
}, action) {
  switch(action.type) {
    case 'INVALID_ZIP':
      return Object.assign({}, state, {
        zipSubmitted: action.zipcode,
        validZip: false
      })
    case 'VALID_ZIP':
      return Object.assign({}, state, {
        zipSubmitted: action.zipcode,
        validZip: true
      })
    case 'DIST_FULFILLED':
      return Object.assign({}, state, {
        zipExist: true,
      })
    case 'DIST_DNE':
      return Object.assign({}, state, {
        zipExist: false,
      })
    case 'DIST_NEED_ADDR':
      return Object.assign({}, state, {
        zipExist: true,
      })
    default: return state
  }
}

function districts(state = {
  loadingDist: false,
  succeedDist: true,
  distFound: [],
}, action) {
  switch(action.type) {
    case 'DIST_PENDING':
      return Object.assign({}, state, {
        loadingDist: true,
        succeedDist: false
      })
    case 'DIST_REJECTED':
      return Object.assign({}, state, {
        loadingDist: false,
        succeedDist: false
      })
    case 'DIST_FULFILLED':
    case 'DIST_NEED_ADDR':
    case 'ADDR_FOUND':
      return Object.assign({}, state, {
        loadingDist: false,
        succeedDist: true,
        distFound: action.distFound
      })
    case 'DIST_DNE':
      return Object.assign({}, state, {
        loadingDist: false,
        succeedDist: true,
      })
    default: return state
  }
}

const rootReducer = combineReducers({
  maps,
  zipcode,
  districts,
  address
})

export default rootReducer
