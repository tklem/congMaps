import { combineReducers } from 'redux'

function maps(state = {
  fetchingMaps: false,
  mapsLoaded: false,
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
        mapsLoaded: true
      })
    case 'INIT_MAPS_REJECTED':
    default:
      return state
  }
}

function validateZip(state = {
  zipSubmitted: "",
  validZip: true
}, action) {
  switch(action.type) {
    case 'INVALID_ZIP':
      return Object.assign({}, state, {
        zipSubmitted: action.zipCode,
        validZip: false
      })
    case 'VALID_ZIP':
      return Object.assign({}, state, {
        zipSubmitted: action.zipCode,
        validZip: true
      })
    default: return state
  }
}

function coords(state = {
  loadingCoords: false,
  succeedCoords: true,
  zipExist: true,
  distMap: null
}, action) {
  switch(action.type) {
    case 'COORDS_PENDING':
      return Object.assign({}, state, {
        loadingCoords: true,
        succeedCoords: false
      })
    case 'COORDS_REJECTED':
      return Object.assign({}, state, {
        loadingCoords: false,
        succeedCoords: false
      })
    case 'COORDS_FULFILLED':
      const coordArr = action.districts;
      if(Object.keys(coordArr).length === 0) {
        return Object.assign({}, state, {
          loadingCoords: false,
          succeedCoords: true,
          zipExist: false
        })
      } else {
        return Object.assign({}, state, {
          loadingCoords: false,
          succeedCoords: true,
          zipExist: true,
          distMap: action.districts
        })
      }
    default: return state
  }
}

const rootReducer = combineReducers({
  maps,
  validateZip,
  coords
})

export default rootReducer
