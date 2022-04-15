import React from 'react';

import { HeaderText } from './HeaderText';
import { bemHelper } from '../bem-helper';

import './Modal.scss';


const cn = bemHelper('modal');

interface ModalProps {
	children: any;
	header: string;
	className?: string;
}

export function Modal({ children, header, className }: ModalProps) {
	return (
		<div className={cn(undefined, undefined, className)}>
			<HeaderText className={cn('header')}>{header}</HeaderText>
			{children}
		</div>
	)
}
