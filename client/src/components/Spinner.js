import React from 'react';
import { bemHelper } from '../bem-helper';

import './Spinner.scss';


const cn = bemHelper('spinner');

export function Spinner() {
	return (
		<div className={cn()}>
			<div className={cn('content')}>
				<div className={cn('bar')} />
				<div className={cn('bar')} />
				<div className={cn('bar')} />
			</div>
		</div>
	);
}
