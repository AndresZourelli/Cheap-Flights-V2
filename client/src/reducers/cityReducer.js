import { FETCH_CITIES, NEW_FLIGHT, SPECIFIC_CITY, CLEAR_CITY } from '../actions/types';

const initialState = {
	cities: [],
	flight: {},
	query: [],
	availableCities: [],
	uploadSuccess: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_CITIES:
			return {
				...state,
				availableCities: action.payload
			};

		case NEW_FLIGHT:
			return {
				...state,
				uploadSuccess: action.payload
			};
		case SPECIFIC_CITY:
			return {
				...state,
				cities: action.payload
			};
		case CLEAR_CITY:
			return {
				...state,
				cities: []
			};
		default:
			return state;
	}
}
