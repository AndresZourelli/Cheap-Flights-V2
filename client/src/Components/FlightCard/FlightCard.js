import React from 'react';

const FlightCard = (props) => {
	const flight = props.flightInfo;
	var arrivingflightstops = '';
	var departingflightstops = '';
	if (flight.departingflightstops === '0') {
		departingflightstops = 'Non-stop';
	} else {
		departingflightstops = flight.departingflightstops + ' stops';
	}

	if (flight.arrivingflightstops === '0') {
		arrivingflightstops = 'Non-stop';
	} else {
		arrivingflightstops = flight.arrivingflightstops + ' stops';
	}
	return (
		<div key={flight.id} className="CityData-items">
			<div className="ticket">
				<a className="website-link" href={flight.websiteurl}>
					<div className="price-container">
						<div className="Price-data">
							<h2>
								<strong>${flight.flightcost}</strong>
							</h2>
						</div>
					</div>
					<div className="image-container">
						<img
							src={require(`./../../images/Destination City/${flight.destination}.jpg`)}
							alt={flight.departingcity}
						/>
						<div className="shadowbox">
							<div className="shadowbox-text">
								<div className="CityData-flight-travel-info-parent">
									<i className="fas fa-plane-departure fa-lg airplane" />{' '}
									<h4 className="flight-travel-info">
										<strong>
											<div className="CityData-back-airport-flight-travel-info">
												<div>{getFlightTime(flight.departingdatetakeoff)}</div>
												{flight.departingairportname}
											</div>
											<div className="CityData-back-text-line-flight-travel-info">
												{flightDuration(
													flight.departingdatetakeoff,
													flight.departingdatelanding
												)}
												<div className="CityData-back-text-line" />
												<div>{departingflightstops}</div>
											</div>
											<div className="CityData-back-airport-flight-travel-info">
												<div>{getFlightTime(flight.departingdatelanding)}</div>
												{}
												{flight.arrivingairportname}
											</div>
										</strong>
									</h4>
								</div>
								<div className="CityData-flight-travel-info-parent">
									<i className="fas fa-plane-arrival fa-lg airplane" />{' '}
									<h4 className="flight-travel-info">
										<strong>
											<div className="CityData-back-airport-flight-travel-info">
												<div>{getFlightTime(flight.arrivingdatetakeoff)}</div>
												{flight.arrivingairportname}
											</div>
											<div className="CityData-back-text-line-flight-travel-info">
												{flight.flightdurationarriving}
												{flightDuration(flight.arrivingdatetakeoff, flight.arrivingdatelanding)}
												<div className="CityData-back-text-line" />
												<div>{arrivingflightstops}</div>
											</div>
											<div className="CityData-back-airport-flight-travel-info">
												<div>{getFlightTime(flight.arrivingdatelanding)}</div>
												{flight.departingairportname}
											</div>
										</strong>
									</h4>
								</div>
							</div>
						</div>
					</div>
					<div className="Title_Date">
						<h2>
							&ensp;
							<strong> {flight.destination}</strong>
						</h2>
						<h5>
							<span className="CityData-text-subtext">
								<i className="fas fa-calendar" />
								<strong>
									{formatStayDuration(flight.departingdatetakeoff, flight.arrivingdatelanding)}
								</strong>
							</span>
							<br />
							<span className="CityData-text-subtext">
								<i className="fas fa-bed" />
								<strong> Days: </strong>
								<strong>{numberofdays(flight.departingdatetakeoff, flight.arrivingdatelanding)}</strong>
							</span>
						</h5>
						<p className="dateAdded">
							<strong>Date Added:</strong> {formatDate(new Date(flight.added))}
						</p>
					</div>
				</a>
			</div>
		</div>
	);
};

export default FlightCard;
function numberofdays(date1, date2) {
	date1 = new Date(date1);
	date2 = new Date(date2);
	var date = date2 - date1;
	date = parseInt(date / 1000 / (3600 * 24));

	return date;
}

function formatStayDuration(date1, date2) {
	date1 = new Date(date1);
	date2 = new Date(date2);
	var monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var day1 = date1.getDate();
	var monthIndex1 = date1.getMonth();

	var day2 = date2.getDate();
	var monthIndex2 = date2.getMonth();
	var year2 = date2.getFullYear();
	return ' ' + monthNames[monthIndex1] + ' ' + day1 + ' - ' + monthNames[monthIndex2] + ' ' + day2 + ' ' + year2;
}

function formatDate(date) {
	var monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	var hours = date.getHours();
	var minutes = date.getMinutes();

	if (hours > 11) {
		if (minutes < 10) {
			minutes = '0' + minutes + ' PM';
		} else {
			minutes = minutes + ' PM';
		}
	} else {
		if (minutes < 10) {
			minutes = '0' + minutes + ' AM';
		} else {
			minutes = minutes + ' AM';
		}
	}

	if (hours % 12 === 0) {
		hours = 12;
	} else {
		hours = hours % 12;
	}

	return monthNames[monthIndex] + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes;
}

function flightDuration(date1, date2) {
	var diff = new Date(date2) - new Date(date1);
	var hours = diff / 1000 / 3600;
	var minutes = (diff / 6000) % 60;

	return parseInt(hours) + 'h ' + minutes + 'm';
}

function getFlightTime(date) {
	date = new Date(date);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	if (hours > 11) {
		if (minutes < 10) {
			minutes = '0' + minutes + ' PM';
		} else {
			minutes = minutes + ' PM';
		}
	} else {
		if (minutes < 10) {
			minutes = '0' + minutes + ' AM';
		} else {
			minutes = minutes + ' AM';
		}
	}

	if (hours % 12 === 0) {
		hours = 12;
	} else {
		hours = hours % 12;
	}
	return hours + ':' + minutes;
}
