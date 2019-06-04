import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Components/Home/Home.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class App extends Component {
	render() {
		const location = this.props.location;
		return (
			<div className="App">
				<div className="view-container">
					<TransitionGroup id="full-height">
						<CSSTransition timeout={3000} classNames="fly" appear>
							<Switch location={location}>
								<Route exact path="/" component={Home} />
								<Route component={Home} />
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				</div>
			</div>
		);
	}
}

export default withRouter(App);
