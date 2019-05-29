import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Navigation.css';
const Navigation = (props) => {
	return (
		<div className="nav-container">
			<nav className="nav-style">
				<ul>
					<li>
						<i className="fas fa-paper-plane fa-lg" />
					</li>
					<li>
						<NavLink to="/" className="nav-inactive" activeClassName="nav-active">
							<strong>Home</strong>
						</NavLink>
					</li>
					<li>
						<NavLink to="" onClick={props.onScroll} className="nav-inactive" activeClassName="nav-active">
							<strong>About</strong>
						</NavLink>
					</li>
					<li>
						<NavLink to="/ContactForm" className="nav-inactive" activeClassName="nav-active">
							<strong>Contact</strong>
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default withRouter(Navigation);
