import { GET_FLIGHTS, SET_FLIGHT_FORM, GET_CITY_IMAGE } from '../actions/types';

const initialState = {
	flight_data: [],
	multi_city_data: [],
	form: {},
	photoData: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_FLIGHTS:
			return {
				...state,
				flight_data: action.payload
			};
		case SET_FLIGHT_FORM:
			return {
				...state,
				form: action.payload
			};
		case GET_CITY_IMAGE:
			return {
				...state,
				photoData: action.payload
			};
		default:
			return state;
	}
}
