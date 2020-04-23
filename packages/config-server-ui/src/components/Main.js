import React from 'react';
import { bemHelper } from '../bem-helper';

import "./Main.scss";


const cn = bemHelper('main');


export function Main({ children, className }) {
	return (
		<main className={cn(null, null, className)}>
			<div className={cn('content')}>
				{children}
			</div>
		</main>
	)
}