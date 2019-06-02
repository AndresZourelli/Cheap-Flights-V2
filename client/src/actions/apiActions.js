import { GET_FLIGHTS, SET_FLIGHT_FORM, GET_CITY_IMAGE } from './types';
import axios from 'axios';
import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({
	applicationId: process.env.REACT_APP_UPLASH_API_KEY,
	secret: process.env.REACT_APP_UPLASH_API_SECRET
});

export const getFlights = (value) => (dispatch) => {
	console.log({ ...value });
	axios
		.get(`https://api.skypicker.com/flights`, {
			params: { ...value }
		})
		.then((cities) => {
			console.log(cities);
			dispatch({
				type: GET_FLIGHTS,
				payload: cities.data.data
			});

			dispatch({
				type: GET_CITY_IMAGE,
				payload: cities.data.data[0].cityTo
			});
			unsplash.search
				.photos(cities.data.data[0].cityTo, 1, 1)
				.then((json) => {
					return json.json();
				})
				.then((json) => console.log(json.results[0].urls));
		})
		.catch((err) => console.log(err));
};

export const setFlightForm = (value) => (dispatch) => {
	console.log(value);
	dispatch({
		type: SET_FLIGHT_FORM,
		payload: value
	});
};
