import React from 'react';
import './Info_Card.css';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Info_Card = ({ history, CityData, expanded = false, showActions = false, goBack = null, ...rest }) => {
	const link = `/location/${CityData.cityname}`;
	return (
		<Link className="link-style" to={link}>
			<img
				className="image_destination"
				src={require(`../../images/Departing Cities/${CityData.cityname}.jpg`)}
				alt={CityData.cityname}
			/>
			<div className="text_container">
				<h1>{CityData.cityname}</h1>
				<p>Click for More Details</p>
			</div>
		</Link>
	);
};

export default withRouter(Info_Card);
