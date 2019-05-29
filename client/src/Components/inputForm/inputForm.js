import React from 'react';
import './InputForm.css';
const InputForm = (props) => {
	let inputElement = null;
	const inputClasses = [ 'InputElement' ];
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push('Invalid');
	}
	switch (props.elementType) {
		case 'input':
			inputElement = (
				<div>
					<h4 className="text-align">{props.TitleText}</h4>{' '}
					<input
						className={inputClasses.join(' ')}
						{...props.elementConfig}
						value={props.value}
						onChange={props.changed}
					/>
				</div>
			);
			break;
		case 'textarea':
			inputElement = (
				<div>
					<h4 className="text-align">{props.TitleText}</h4>
					<textarea
						className={inputClasses.join(' ')}
						{...props.elementConfig}
						value={props.value}
						onChange={props.changed}
					/>
				</div>
			);
			break;
		case 'select':
			inputElement = (
				<div>
					<h4 className="text-align">{props.TitleText}</h4>
					<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
						{props.elementConfig.options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.displayValue}
							</option>
						))}
					</select>
				</div>
			);
			break;
		case 'solid':
			inputElement = (
				<div className="Flight-Titles">
					<h2>{props.TitleText}</h2>
				</div>
			);
			break;

		default:
			inputElement = (
				<div>
					<h4 className="text-align">{props.TitleText}</h4>
					<input
						className={inputClasses.join(' ')}
						{...props.elementConfig}
						value={props.value}
						onChange={props.changed}
					/>
				</div>
			);
	}
	return (
		<div className="Input">
			<label className="Label">{props.label}</label>
			{inputElement}
		</div>
	);
};

export default InputForm;
