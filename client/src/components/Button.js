import React from 'react';
import { bemHelper } from '../bem-helper';
import { Icon } from './Icon';

import "./Button.scss";


const cn = bemHelper('button');


export function Button({ children, small = false, action = false, className = '', icon }) {
	return (
		<button className={cn(null, { small, action }, className)}>
			{icon && <Icon name={icon} className={cn('icon')}/>}
			{children && <span className={cn('text')}>{children}</span>}
		</button>
	)
}
