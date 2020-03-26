import React from 'react';
import { bemHelper } from '../bem-helper';

import "./Text.scss";


const cn = bemHelper('text');


export function Text({ size = 's', children, className }) {
	return (
		<div className={cn(null, { [`size-` + size]: !!size }, className)}>{children}</div>
	)
}
