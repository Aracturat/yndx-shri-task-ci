import React from 'react';
import { bemHelper } from '../bem-helper';

const cn = bemHelper('button');

export function Button({ children, small = false, action = false, className = '', icon }) {
	return (
		<button className={cn(null, { small, action }, className)}>
			{icon && <span className={cn('icon', null, `icon icon--${icon}`)}></span>}
			{children && <span className={cn('text')}>{children}</span>}
		</button>
	)
}
