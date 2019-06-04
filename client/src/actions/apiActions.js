import { GET_FLIGHTS, SET_FLIGHT_FORM, GET_CITY_IMAGE } from './types';
import axios from 'axios';

export const getFlights = (value) => (dispatch) => {
	axios
		.get(`https://api.skypicker.com/flights`, {
			params: { ...value }
		})
		.then((cities) => {
			dispatch({
				type: GET_FLIGHTS,
				payload: cities.data.data
			});
			console.log(process.env.REACT_APP_UPLASH_API_KEY);
			axios
				.get('https://api.unsplash.com/search/photos', {
					params: {
						client_id: process.env.REACT_APP_UPLASH_API_KEY,
						query: cities.data.data[0].cityTo,
						orientation: 'landscape'
					}
				})
				.then((res) => {
					dispatch({
						type: GET_CITY_IMAGE,
						payload: res.data
					});
				});
		})
		.catch((err) => console.log(err));
};

export const setFlightForm = (value) => (dispatch) => {
	dispatch({
		type: SET_FLIGHT_FORM,
		payload: value
	});
};
