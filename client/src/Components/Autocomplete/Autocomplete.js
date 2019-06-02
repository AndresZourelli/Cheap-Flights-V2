import React, { Component } from 'react';
import airports from '../../Data/airports.json';
import { getFlights, setFlightForm } from '../../actions/apiActions.js';
import { connect } from 'react-redux';
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
				nights_in_dst_from: '7',
				nights_in_dst_to: '10',
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
	render() {
		let indexResultsDepartures = this.state.displayResultDeparture.map((data) => (
			<div
				key={data.ICAO}
				className="p-3 border-right border-bottom border-dark border-left"
				onClick={() => this.onClickDeparture(data.name, data.IATA)}>
				<h4>Name: {data.name}</h4>
			</div>
		));
		let indexResultsDestination = this.state.displayResultDestination.map((data) => (
			<div
				key={data.ICAO}
				className="p-3 border-right border-bottom border-dark border-left"
				onClick={() => this.onClickDestination(data.name, data.IATA)}>
				<h4>Name: {data.name}</h4>
			</div>
		));
		return (
			<div className="">
				<div className="input-group m-3">
					<input
						type="text"
						value={this.state.form.fly_from}
						className="form-control"
						placeholder="Departure"
						onChange={(e) => this.onChangeDeparture(e)}
						aria-label="Username"
						aria-describedby="basic-addon1"
					/>
				</div>
				{indexResultsDepartures}
				<div className="input-group m-3">
					<input
						type="text"
						value={this.state.form.fly_to}
						className="form-control"
						placeholder="Destination"
						onChange={(e) => this.onChangeDestination(e)}
						aria-label="Username"
						aria-describedby="basic-addon1"
					/>
				</div>
				{indexResultsDestination}
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
