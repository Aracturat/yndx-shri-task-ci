import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';

import { bemHelper } from '../bem-helper';

import './FormField.scss';


const cn = bemHelper('form-field');

interface FormFieldProps {
	value?: string;
	onChange?: (value: string) => void;
	label?: string;
	afterElement?: React.ReactNode;
	required?: boolean;
	inline?: boolean;
	placeholder?: string;
	mask?: (input: string) => RegExp[];
	className?: string;
}


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
		mask,
		className
	}: FormFieldProps
) {
	const inputId = `form-field-${id++}`;

	const [inputValue, setInputValue] = useState(value || '');

	useEffect(() => {
		onChange && onChange(inputValue);
	}, [inputValue, onChange]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleClearClick = () => {
		setInputValue("");
	};

	const defaultMask = (input: string) => {
		return input.split("").map(() => /./);
	};

	return (
		<div className={cn(undefined, { required, inline }, className)}>
			{ label && <label className={cn('label')} htmlFor={inputId}>{label}</label>}
			<MaskedInput
				mask={mask || defaultMask}
				className={cn('input')}
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
