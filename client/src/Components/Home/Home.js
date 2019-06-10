import React, { Component } from 'react';
import './Home.css';
import { withRouter } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { connect } from 'react-redux';
import Autocomplete from '../Autocomplete/Autocomplete';

class Home extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	scrollToMyRef = () =>
		window.scrollTo({
			top: this.myRef.current.offsetTop,
			behavior: 'smooth'
		});

	render() {
		const flights = (this.props.flightsData || []).map((data, k) => (
			<div key={k} className="flight_info">
				<h4 className="flight_info_items">From: {data.cityFrom}</h4>
				<h4 className="flight_info_items">To: {data.cityTo}</h4>
				<h4 className="flight_info_items">Price: {data.price}</h4>
				<h4 className="flight_info_items">Flight time to: {data.fly_duration}</h4>
				<h4 className="flight_info_items">Return Flight time: {data.return_duration}</h4>
			</div>
		));

		return (
			<div className="full-height">
				<div className="Title-container">
					<Navigation onScroll={this.scrollToMyRef} />
				</div>

				<div className="home-question-container">
					<h2>
						<strong>Where do you want to escape to?</strong>
					</h2>
					<p>Find your next trip here </p>
				</div>
				<Autocomplete />
				<div ref={this.myRef} id="about" className="home-about">
					<div className="home-about-container">
						<h1>
							<strong>Why</strong> Choose Us?
						</h1>
						<br />
						<p>Here at Cheap Flights we do the heavy lifting for you!</p>
						<p>
							We manually search for the best deals on flights and share them with you in one easy to
							search place.
						</p>
					</div>
				</div>
				{Object.keys(this.props.apiPhoto).length > 0 ? (
					<div className="image_container_home">
						<img src={this.props.apiPhoto.results[0].urls.regular} alt="" />
						<div className="attribution">Image Attribute</div>
					</div>
				) : null}
				{flights}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	citys: state.citys.availableCities,
	apiPhoto: state.api.photoData,
	flightsData: state.api.flight_data
});

export default connect(mapStateToProps)(withRouter(Home));
