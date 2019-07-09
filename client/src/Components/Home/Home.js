import React, { Component } from 'react';
import './Home.css';
import { withRouter, Redirect } from 'react-router-dom';
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

	linkClick = (data) => <Redirect to={data.deep_link}>{console.log('hello')}</Redirect>;

	render() {
		const flights = (this.props.flightsData || []).map((data, k) => (
			<a
				href={data.deep_link}
				key={k}
				className="flight_info p-5"
				onClick={() => {
					this.linkClick(data);
				}}>
				<h4 className="flight_info_items">
					<strong>From:</strong> {data.cityFrom}
				</h4>
				<h4 className="flight_info_items">
					<strong>To:</strong> {data.cityTo}
				</h4>
				<h4 className="flight_info_items">
					<strong>Price:</strong> ${data.price}
				</h4>
				<h4 className="flight_info_items">
					<strong>Flight Time To:</strong> {data.fly_duration}
				</h4>
				<h4 className="flight_info_items">
					<strong>Return Flight Time:</strong> {data.return_duration}
				</h4>
				<h4 className="flight_info_items">
					<strong>Nights in Destination:</strong> {data.nightsInDest}
				</h4>
				{/* {data.route.length > 2 ? (
					<h4 className="flight_info_items">
						Transfers: {data.route.map((element, idx) => <div key={element.id}>{element.flyTo}</div>)}
					</h4>
				) : null} */}
			</a>
		));

		const why = (
			<div ref={this.myRef} id="about" className="home-about">
				<div className="home-about-container">
					<h1>
						<strong>Why</strong> Choose Us?
					</h1>
					<br />
					<p>Here at Cheap Flights we do the heavy lifting for you!</p>
					<p>We search for the best deals on flights and share them with you in one easy to search place.</p>
				</div>
			</div>
		);

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
				{this.props.flightsData.length === 0 ? why : null}
				{Object.keys(this.props.apiPhoto).length > 0 ? (
					<div className="image_container_home">
						<h1 className="image-title image-home-flex">{this.props.flightsData[0].cityTo}</h1>
						<div className="image_holder_home image-home-flex">
							<div className="attribution">
								<img
									className="image-home"
									src={this.props.apiPhoto.results[0].urls.regular}
									alt={this.props.flightsData[0].cityTo}
								/>
								<a className="bottom-right" href={this.props.apiPhoto.results[0].user.portfolio_url}>
									{this.props.apiPhoto.results[0].user.name}
								</a>
							</div>
						</div>
					</div>
				) : null}
				<div className="flight_holder">{flights}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	citys: state.citys.availableCities,
	apiPhoto: state.api.photoData,
	flightsData: state.api.flight_data,
	loadingData: state.api.loading
});

export default connect(mapStateToProps)(withRouter(Home));
