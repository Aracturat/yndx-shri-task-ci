import React from 'react';

import { HeaderText } from './HeaderText';
import { bemHelper } from '../bem-helper';

import './Modal.scss';


const cn = bemHelper('modal');

export function Modal({ children, header, className }) {
	return (
		<div className={cn(null, null, className)}>
			<HeaderText className={cn('header')}>{header}</HeaderText>
			{children}
		</div>
	)
}
