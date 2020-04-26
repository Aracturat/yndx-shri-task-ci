import React from 'react';
import { bemHelper } from '../bem-helper';
import { Icon, IconName } from './Icon';

import "./TextWithIcon.scss";


const cn = bemHelper('text-with-icon');

interface TextWithIconProps {
	icon: IconName;
	primary?: string;
	secondary?: string;
	className?: string;
}

export function TextWithIcon({ icon, primary, secondary, className }: TextWithIconProps) {
	return (
		<div className={cn(undefined, undefined, className)}>
			<Icon name={icon} size="s" className={cn('icon')} />
			{primary && <div className={cn('primary-text')}>{primary}</div>}
			{secondary && <div className={cn('secondary-text')}>{secondary}</div>}
		</div>
	)
}
