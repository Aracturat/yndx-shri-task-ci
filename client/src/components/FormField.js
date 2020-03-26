import React, { useState } from 'react';
import { bemHelper } from '../bem-helper';

import './FormField.scss';


const cn = bemHelper('form-field');


let id = 0;

export function FormField(
	{
		value,
		onChange,
		label,
		afterElement,
		required = false,
		inline = false,
		placeholder,
		className
	}
) {
	const inputId = `form-field-${id++}`;

	const [inputValue, setInputValue] = useState(value);

	const handleChange = (event) => {
		setInputValue(event.target.value);
		onChange && onChange(event.target.value);
	};

	return (
		<div className={cn(null, { required, inline }, className)}>
			<label className={cn('label')} htmlFor={inputId}>{label}</label>
			<input className={cn('input')}
				type="text"
				placeholder={placeholder}
				id={inputId}
				defaultValue={value}
				onChange={handleChange}
			/>
			{inputValue && <span className={cn('clear-button')} />}
			{afterElement && <span className={cn('after-element')}>{afterElement}</span>}
		</div>
	)
}
