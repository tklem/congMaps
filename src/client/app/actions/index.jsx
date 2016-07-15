import loadGoogleMapsApi from 'load-google-maps-api';

export function changeAddress(address) {
	return {
		type:'CHANGE_ADDRESS',
		address
	}
}

export function changeDistrict(district) {
	return {
		type:'CHANGE_DISTRICT',
		district
	}
}

export function changeLatLng(latLng) {
	return {
		type: 'CHANGE_LAT_LNG',
		latLng
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