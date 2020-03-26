import React from 'react';
import { bemHelper } from '../bem-helper';
import { Icon } from './Icon';

import "./TextWithIcon.scss";


const cn = bemHelper('text-with-icon');


export function TextWithIcon({ icon, primary, secondary, className }) {
	return (
		<div className={cn(null, null, className)}>
			<Icon name={icon} size="s" className={cn('icon')} />
			{primary && <div className={cn('primary-text')}>{primary}</div>}
			{secondary && <div className={cn('secondary-text')}>{secondary}</div>}
		</div>
	)
}
