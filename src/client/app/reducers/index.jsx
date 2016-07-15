import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

const SPRINGFIELD_POSITION = {
  lat: 39.7817,
  lng: -89.6501
};

const defaultMap = {
	fetchingMaps: false,
	mapsLoaded: false,
	mapService: null
}

const defaultInfo = {
	address: "",
	district: "",
	latLng: SPRINGFIELD_POSITION
}

function createMap(state = defaultMap, action) {
	switch(action.type) {
		case 'INIT_MAPS_PENDING':
			return Object.assign({}, state, {
				fetchingMaps: true,
			});
		case 'INIT_MAPS_FULFILLED':
			return Object.assign({}, state, {
				fetchingMaps: false,
				mapsLoaded: true,
				mapService: action.payload.body
			});
		case 'INIT_MAPS_REJECTED':
			console.log("Map failed to load.");
			return Object.assign({}, state, {
				fetchingMaps: false,
				mapsLoaded: false,
				mapService: null
			});

		default: return state;
	}
}

function infoChange(state = defaultInfo, action) {
	switch(action.type) {
		case 'CHANGE_ADDRESS':
			return Object.assign({}, state, {
				address
			});
		case 'CHANGE_DISTRICT':
			return Object.assign({}, state, {
				district
			});
		case 'CHANGE_LAT_LNG':
			return Object.assign({}, state, {
				latLng
			});
		default: return state;
	}
}

const rootReducer = combineReducers({
	createMap,
	infoChange,
	form: formReducer
});

export default rootReducer;