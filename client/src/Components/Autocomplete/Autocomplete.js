import React, { Component } from 'react';
import airports from '../../Data/airports.json';
import { getFlights, setFlightForm } from '../../actions/apiActions.js';
import { connect } from 'react-redux';
import './Autocomplete.css';
class Autocomplete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayResultDeparture: [],
			displayResultDestination: [],
			form: {
				fly_to: '',
				fly_from: '',
				curr: 'USD',
				v: '3',
				date_from: '01/7/2019',
				date_to: '01/8/2019',
				nights_in_dst_from: '',
				nights_in_dst_to: '',
				adults: '1',
				infants: '0',
				selected_cabins: 'M',
				partner: 'picky',
				local: 'en',
				limit: '25',
				sort: 'price',
				asc: '1'
			},
			searchVal: ''
		};
	}
	componentDidUpdate(prevProps) {
		if (this.props.flightDataUpdated !== prevProps.flightDataUpdated) {
			this.props.getFlights(this.props.flightDataUpdated);
		}
	}
	onChangeDeparture = (event) => {
		let form = {};
		for (let Element in this.state.form) {
			form[Element] = this.state.form[Element];
		}
		let results = search(event.target.value, airports.airports);
		if (!event.target.value) {
			form.fly_from = '';
			this.setState({ form: form, displayResultDeparture: [] });
		} else {
			form['fly_from'] = event.target.value;
			this.setState({ form: form, displayResultDeparture: results });
		}
	};

	onChangeDestination = (event) => {
		let form = {};
		for (let Element in this.state.form) {
			form[Element] = this.state.form[Element];
		}

		let results = search(event.target.value, airports.airports);
		if (!event.target.value) {
			form.fly_to = '';
			this.setState({ form: form, displayResultDestination: [] });
		} else {
			form['fly_to'] = event.target.value;
			this.setState({ form: form, displayResultDestination: results });
		}
	};
	onSubmit = () => {
		this.props.fetchFlights(this.state.form);
	};
	onClickDeparture = (name, code) => {
		let form = {};
		for (let Element in this.state.form) {
			form[Element] = this.state.form[Element];
		}
		form.fly_from = code;
		this.setState({ displayResultDeparture: [], form: form });
	};
	onClickDestination = (name, code) => {
		let form = {};
		for (let Element in this.state.form) {
			form[Element] = this.state.form[Element];
		}
		form.fly_to = code;
		this.setState({ displayResultDestination: [], form: form });
	};

	handleDateChangeStart = (event) => {
		let form = {};
		for (let Element in this.state.form) {
			form[Element] = this.state.form[Element];
		}
		form.date_from = changeDateforAPI(event.target.value);
		this.setState({ form: form });
	};

	handleDateChangeStop = (event) => {
		let form = {};
		for (let Element in this.state.form) {
			form[Element] = this.state.form[Element];
		}
		form.date_to = changeDateforAPI(event.target.value);
		this.setState({ form: form });
	};
	onAdultChange = (event) => {
		let form = {};
		for (let Element in this.state.form) {
			form[Element] = this.state.form[Element];
		}
		form.adults = event.target.value;
		this.setState({ form: form });
	};
	onInfantChange = (event) => {
		let form = {};
		for (let Element in this.state.form) {
			form[Element] = this.state.form[Element];
		}
		form.infants = event.target.value;
		this.setState({ form: form });
	};
	onMinNightChange = (event) => {
		let form = {};
		for (let Element in this.state.form) {
			form[Element] = this.state.form[Element];
		}
		form.nights_in_dst_from = event.target.value;
		this.setState({ form: form });
	};
	onMaxNightChange = (event) => {
		let form = {};
		for (let Element in this.state.form) {
			form[Element] = this.state.form[Element];
		}
		form.nights_in_dst_to = event.target.value;
		this.setState({ form: form });
	};
	onCabinChange = (event) => {
		let form = {};
		for (let Element in this.state.form) {
			form[Element] = this.state.form[Element];
		}
		form.selected_cabins = event.target.value;
		this.setState({ form: form });
	};
	render() {
		let indexResultsDepartures = this.state.displayResultDeparture.map((data) => (
			<div
				key={data.ICAO}
				className="p-3 border-right border-bottom border-dark border-left dropdown"
				onClick={() => this.onClickDeparture(data.name, data.IATA)}>
				<h4>
					<strong>City:</strong> {data.city} <strong>Name: </strong>
					{data.name} <strong>Airport Code:</strong> {data.IATA}
				</h4>
			</div>
		));
		let indexResultsDestination = this.state.displayResultDestination.map((data) => (
			<div
				key={data.ICAO}
				className="p-3 border-right border-bottom border-dark border-left dropdown"
				onClick={() => this.onClickDestination(data.name, data.IATA)}>
				<h4>
					<strong>City:</strong> {data.city} <strong>Name: </strong>
					{data.name} <strong>Airport Code:</strong> {data.IATA}
				</h4>
			</div>
		));
		return (
			<div className="">
				<span className="input_container">
					<div className="p-3 w-50 input_container_items">
						<input
							type="text"
							value={this.state.form.fly_from}
							className="form-control  "
							placeholder="Fly From"
							onChange={(e) => this.onChangeDeparture(e)}
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
						{this.state.displayResultDeparture.length === 0 ? null : (
							<div style={{ width: '100%', position: 'relative' }}>
								<div className="dropdown_list">{indexResultsDepartures}</div>
							</div>
						)}
					</div>
					<div className="p-3 w-50 input_container_items">
						<input
							type="text"
							value={this.state.form.fly_to}
							className="form-control "
							placeholder="Fly to"
							onChange={(e) => this.onChangeDestination(e)}
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
						{this.state.displayResultDestination.length === 0 ? null : (
							<div style={{ width: '100%', position: 'relative' }}>
								<div className="dropdown_list">{indexResultsDestination}</div>
							</div>
						)}
					</div>
					<div class="input-group p-3 input_container_items">
						<div class="input-group-prepend">
							<span class="input-group-text">From:</span>
						</div>
						<input
							id="date"
							type="date"
							onChange={this.handleDateChangeStart}
							className=" form-control"
							style={{ display: 'inherit' }}
						/>
					</div>
					<div class="input-group p-3  input_container_items">
						<div class="input-group-prepend">
							<span class="input-group-text">To:</span>
						</div>
						<input
							id="date"
							type="date"
							onChange={this.handleDateChangeStop}
							className="form-control"
							style={{ display: 'inherit' }}
						/>
					</div>
				</span>
				<span />
				<br />
				<div className="input_container">
					<div class="input-group p-3 input_container_items">
						<div class="input-group-prepend">
							<span class="input-group-text">Adults:</span>
						</div>
						<input
							aria-describedby="basic-addon1"
							id="adult"
							type="number"
							defaultValue="1"
							min="1"
							step="1"
							onChange={this.onAdultChange}
							className="form-control"
							style={{ display: 'inherit' }}
						/>
					</div>
					<div class="input-group p-3 input_container_items">
						<div class="input-group-prepend">
							<span class="input-group-text">Infants:</span>
						</div>
						<input
							id="infant"
							type="number"
							defaultValue="0"
							min="0"
							step="1"
							onChange={this.onInfantChange}
							className="form-control"
							style={{ display: 'inherit' }}
						/>
					</div>
					<div class="input-group p-3 input_container_items">
						<div class="input-group-prepend">
							<span class="input-group-text">Min Nights:</span>
						</div>
						<input
							id="nights"
							type="number"
							defaultValue="0"
							min="0"
							step="1"
							onChange={this.onMinNightChange}
							className="form-control"
							style={{ display: 'inherit' }}
						/>
					</div>
					<div class="input-group p-3 input_container_items">
						<div class="input-group-prepend">
							<span class="input-group-text">Max Nights:</span>
						</div>
						<input
							id="nights"
							type="number"
							defaultValue="0"
							min="0"
							step="1"
							onChange={this.onMaxNightChange}
							className="form-control"
							style={{ display: 'inherit' }}
						/>
					</div>

					<span className="w-50">
						<select
							name="Cabin"
							onChange={this.onCabinChange}
							className="form-control m-3 w-25"
							style={{ display: 'inherit' }}>
							<option value="M">Economy</option>
							<option value="W">Economy Premium</option>
							<option value="C">Business</option>
							<option value="F">First Class</option>
						</select>
					</span>
				</div>
				<button onClick={this.onSubmit}>SUBMIT</button>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		fetchFlights: (data) => {
			dispatch(setFlightForm(data));
		},
		getFlights: (value) => {
			dispatch(getFlights(value));
		}
	};
};

const mapStateToProps = (state) => ({
	flightDataUpdated: state.api.form
});

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);

function search(nameKey, myArray) {
	var results = [];
	for (var i = 0; i < myArray.length; i++) {
		if (results.length === 10) {
			return results;
		}
		if (
			myArray[i].name.toUpperCase().startsWith(nameKey.toUpperCase()) ||
			myArray[i].city.toUpperCase().startsWith(nameKey.toUpperCase()) ||
			myArray[i].IATA.toUpperCase().startsWith(nameKey.toUpperCase())
		) {
			results.push(myArray[i]);
		}
	}
	return results;
}

function changeDateforAPI(date) {
	let dateParts = date.split('-');
	let year = dateParts[0];
	let month = dateParts[1];
	let day = dateParts[2];
	let combine = day + '/' + month + '/' + year;
	return combine;
}
