import React, { useEffect, useState } from 'react';
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

	const [inputValue, setInputValue] = useState(value || '');

	useEffect(() => {
		onChange && onChange(inputValue);
	}, [inputValue]);

	const handleChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleClearClick = () => {
		setInputValue("");
	};

	return (
		<div className={cn(null, { required, inline }, className)}>
			<label className={cn('label')} htmlFor={inputId}>{label}</label>
			<input className={cn('input')}
				type="text"
				placeholder={placeholder}
				id={inputId}
				value={inputValue}
				onChange={handleChange}
				required={required}
			/>
			{inputValue && <span className={cn('clear-button')} onClick={handleClearClick} />}
			{afterElement && <span className={cn('after-element')}>{afterElement}</span>}
		</div>
	)
}
