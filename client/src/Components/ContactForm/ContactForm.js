import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../Navigation/Navigation';
import './ContactForm.css';
export default class ContactForm extends Component {
	state = {
		name: '',
		message: '',
		email: '',
		sent: false,
		buttonText: 'Send Message'
	};
	formSubmit = (e) => {
		e.preventDefault();

		this.setState({
			buttonText: '...sending'
		});

		let data = {
			name: this.state.name,
			email: this.state.email,
			message: this.state.message
		};

		axios
			.post('/api/sendEmail', data)
			.then((res) => {
				if (res.status === 200) {
					this.setState({ sent: true }, this.resetForm());
				}
			})
			.catch((err) => {
				console.log('Message not sent', err);
			});
	};

	resetForm = () => {
		this.setState({
			name: '',
			message: '',
			email: '',
			buttonText: 'Message Sent'
		});
	};
	render() {
		return (
			<div>
				<Navigation />

				<form className="contact-form" onSubmit={(e) => this.formSubmit(e)}>
					<h1>Contact Form</h1>
					<label className="message" htmlFor="message-input">
						Your Message
					</label>

					<textarea
						onChange={(e) => this.setState({ message: e.target.value })}
						name="message"
						className="InputElement"
						type="text"
						placeholder="Please write your message here"
						value={this.state.message}
						required
					/>

					<label className="message-name" htmlFor="message-name">
						Your Name
					</label>

					<input
						onChange={(e) => this.setState({ name: e.target.value })}
						name="name"
						className="InputElement"
						type="text"
						placeholder="Your Name"
						value={this.state.name}
					/>

					<label className="message-email" htmlFor="message-email">
						Your Email
					</label>

					<input
						onChange={(e) => this.setState({ email: e.target.value })}
						name="email"
						className="InputElement"
						type="email"
						placeholder="your@email.com"
						required
						value={this.state.email}
					/>

					<div className="button--container">
						<button type="submit" className="button button-primary">
							<i className="fas fa-paper-plane fa-lg" /> {this.state.buttonText}
						</button>
					</div>
				</form>
			</div>
		);
	}
}
