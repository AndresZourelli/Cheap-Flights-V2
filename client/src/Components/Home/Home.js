import React, { Component } from 'react';
import './Home.css';
import { withRouter } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { connect } from 'react-redux';
import InfoCard from '../Info_Card/Info_Card.js';
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
		const infer = (this.props.citys || []).map((data, k) => (
			<div key={k} className="holder">
				<InfoCard CityData={data} key={data} {...this.props} />
			</div>
		));
		return (
			<div className="full-height">
				<div className="Title-container">
					<Navigation onScroll={this.scrollToMyRef} />
				</div>
				<div className="home-question-container">
					<h2>
						<strong>Where are you traveling from?</strong>
					</h2>
					<p>Find your next trip here </p>
				</div>
				<div className="card_holder card-holder-style">{infer}</div>
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
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	citys: state.citys.availableCities
});
export default connect(mapStateToProps)(withRouter(Home));
