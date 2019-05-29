import { combineReducers } from 'redux';
import cityReducer from './cityReducer.js';

export default combineReducers({
	citys: cityReducer
});