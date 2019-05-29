import React, { Component } from 'react';
import { connect } from 'react-redux';
import { specificCity, clearCity } from '../../actions/cityAction.js';
import { withRouter } from 'react-router-dom';
import './CityData.css';
import Navigation from '../Navigation/Navigation';
import FlightCard from '../FlightCard/FlightCard';
class CityPage extends Component {
	componentDidMount() {
		this.props.GetSpecificCity(this.props.match.params.id);
		window.scrollTo(0, 0);
	}
	componentWillUnmount() {
		this.props.ClearCity();
	}

	render() {
		const flights = (this.props.citys.payload || [])
			.map((flight) => <FlightCard key={flight.id} flightInfo={flight} />);

		var cityName = [];
		if (this.props.citys.payload && this.props.citys.payload.length > 0) {
			cityName = this.props.citys.payload[0].departingcity;
		}

		const red = this.props.citys.payload;
		return (
			<div className="CityData-body">
				<div className="nav-container">
					<Navigation />
				</div>
				<div className="Title-Container">
					<div className="Title">
						<h1>
							Leaving <strong>{cityName}</strong> <br /> &ensp; &ensp; &ensp; &ensp; &ensp;and going to...
						</h1>
					</div>
				</div>
				<div className="Container">
					{red === undefined && (
						<div>
							<h1>loading....</h1>
						</div>
					)}

					{red !== undefined && <div className="CardContainer">{flights}</div>}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	citys: state.citys.cities
});

const mapDispatchToProps = (dispatch) => {
	return {
		GetSpecificCity: (cityName) => {
			dispatch(specificCity(cityName));
		},
		ClearCity: () => {
			dispatch(clearCity());
		}
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CityPage));
