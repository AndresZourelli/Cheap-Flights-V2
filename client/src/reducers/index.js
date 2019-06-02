import { combineReducers } from 'redux';
import cityReducer from './cityReducer.js';
import apiReducer from './apiReducer.js';
export default combineReducers({
	citys: cityReducer,
	api: apiReducer
});