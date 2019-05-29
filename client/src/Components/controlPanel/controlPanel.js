import React, { Component } from 'react';
import InputForm from '../inputForm/inputForm';
import './controlPanel.css';
import { connect } from 'react-redux';
import { newFlight } from '../../actions/cityAction';
import { Redirect } from 'react-router-dom';

class ControlPanel extends Component {
	state = {
		newFlightForm: {
			Departingtitle: {
				TitleText: 'Departing Flight Information',
				elementType: 'solid',
				valid: true
			},
			departingcity: {
				TitleText: 'Where is this Flight Taking off From?',
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'select_city', displayValue: 'Select Departing City' },
						{ value: 'Los Angeles', displayValue: 'Los Angeles' },
						{ value: 'New York', displayValue: 'New York' },
						{ value: 'San Francisco', displayValue: 'San Francisco' },
						{ value: 'Chicago', displayValue: 'Chicago' },
						{ value: 'Dalla-Fort Worth', displayValue: 'Dallas-Fort Worth' },
						{ value: 'Philadelphia', displayValue: 'Philadelphia' }
					]
				},
				validation: {
					required: true
				},
				value: '',
				valid: true,
				touched: false
			},
			departingairportname: {
				TitleText: 'What is the Departing Airport Name Code?',
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Airport Name Code'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			destination: {
				TitleText: "What is the trip's destination?",
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'select_city', displayValue: 'Select Destination City' },
						{ value: 'Bangkok', displayValue: 'Bangkok' },
						{ value: 'London', displayValue: 'London' },
						{ value: 'Paris', displayValue: 'Paris' },
						{ value: 'Dubai', displayValue: 'Dubai' },
						{ value: 'Singapore', displayValue: 'Singapore' },
						{ value: 'Kuala Lumpar', displayValue: 'Kuala Lumpar' },
						{ value: 'Istanbul', displayValue: 'Istanbul' },
						{ value: 'Tokyo', displayValue: 'Tokyo' },
						{ value: 'Seoul', displayValue: 'Seoul' },
						{ value: 'Phuket', displayValue: 'Phuket' },
						{ value: 'Pattaya', displayValue: 'Pattaya' },
						{ value: 'Palma de Mallorca', displayValue: 'Palma de Mallorca' },
						{ value: 'Milan', displayValue: 'Milan' },
						{ value: 'Hong Kong', displayValue: 'Hong Kong' },
						{ value: 'Barcelona', displayValue: 'Barcelona' },
						{ value: 'Osaka', displayValue: 'Osaka' },
						{ value: 'Bali', displayValue: 'Bali' },
						{ value: 'Amsterdam', displayValue: 'Amsterdam' }
					]
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			arrivingairportname: {
				TitleText: 'What is the destination airport name code?',
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Airport Name Code'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			departingdatetakeoff: {
				TitleText: 'What time does it take off at?',
				elementType: 'input',
				elementConfig: {
					type: 'datetime-local',
					placeholder: 'Enter Date and Time'
				},
				value: toDateTimeLocal(new Date()),
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			departingdatelanding: {
				TitleText: 'What time does it land at?',
				elementType: 'input',
				elementConfig: {
					type: 'datetime-local',
					placeholder: 'Enter Date and Time'
				},
				value: toDateTimeLocal(new Date()),
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			departingflightstops: {
				TitleText: 'How many stops does this flight make?',
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Number of stops'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			Returningtitle: {
				TitleText: 'Returning Flight Information',
				elementType: 'solid',
				valid: true
			},
			arrivingdatetakeoff: {
				TitleText: 'What time does it take off at?',
				elementType: 'input',
				elementConfig: {
					type: 'datetime-local',
					placeholder: 'Enter Date and Time'
				},
				value: toDateTimeLocal(new Date()),
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			arrivingdatelanding: {
				TitleText: 'What time does it Land at?',
				elementType: 'input',
				elementConfig: {
					type: 'datetime-local',
					placeholder: 'Enter Date and Time'
				},
				value: toDateTimeLocal(new Date()),
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},

			arrivingflightstops: {
				TitleText: 'How many stops does this flight make?',
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Number of stops'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			general: {
				TitleText: 'General Information',
				elementType: 'solid',
				valid: true
			},
			flightcost: {
				TitleText: 'How much does it all cost?',
				elementType: 'input',
				elementConfig: {
					type: 'number',
					placeholder: 'Enter Flight Cost'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},

			websiteurl: {
				TitleText: 'Where can the deal be found?',
				elementType: 'input',
				elementConfig: {
					type: 'url',
					placeholder: 'Enter Website URL'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			}
		},
		added: new Date(),
		formIsValid: false,
		loading: false
	};

	uploadHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let formElementIdentifier in this.state.newFlightForm) {
			formData[formElementIdentifier] = this.state.newFlightForm[formElementIdentifier].value;
		}

		const packaged = {
			flightData: formData
		};

		this.props.newFlight(packaged);

		//Resets State after upload complete
		for (let formElementIdentifier in this.state.newFlightForm) {
			this.setState({ [formElementIdentifier]: '' });
		}
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedNewFlightsForm = {
			...this.state.newFlightForm
		};
		const updatedFormElement = {
			...updatedNewFlightsForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedNewFlightsForm[inputIdentifier] = updatedFormElement;
		let formIsValid = true;
		for (let inputIdentifier in updatedNewFlightsForm) {
			formIsValid = updatedNewFlightsForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({ newFlightForm: updatedNewFlightsForm, formIsValid: formIsValid });
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (value !== 'Select Departing City') {
			isValid = value !== 'select_city' && isValid;
		}
		return isValid;
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.newFlightForm) {
			formElementsArray.push({
				id: key,
				config: this.state.newFlightForm[key]
			});
		}
		let form = (
			<form onSubmit={this.uploadHandler}>
				{formElementsArray.map((formElement) => (
					<InputForm
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						touched={formElement.config.touched}
						shouldValidate={formElement.config.validation}
						TitleText={formElement.config.TitleText}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<button disabled={!this.state.formIsValid}>SUBMIT</button>
			</form>
		);

		const redirect = <Redirect to="/" />;
		// const redirect = (
		// 	<div className="successUpload_background">
		// 		<div className="successUpload">
		// 			<h1>Upload Successful!</h1>
		// 		</div>
		// 	</div>
		// );
		return (
			<div className="ControlPanel">
				<h1>Enter New Flight Information</h1>
				{this.props.citys ? redirect : form}
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	citys: state.citys.uploadSuccess
});
export default connect(mapStateToProps, { newFlight })(ControlPanel);

function toDateTimeLocal(date1) {
	var date = date1,
		ten = function(i) {
			return (i < 10 ? '0' : '') + i;
		},
		YYYY = date.getFullYear(),
		MM = ten(date.getMonth() + 1),
		DD = ten(date.getDate()),
		HH = ten(date.getHours()),
		II = ten(date.getMinutes()),
		SS = ten(date.getSeconds());
	return YYYY + '-' + MM + '-' + DD + 'T' + HH + ':' + II + ':' + SS;
}
