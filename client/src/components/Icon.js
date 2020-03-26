import React from 'react';
import { bemHelper } from '../bem-helper';

import "./Icon.scss";


const cn = bemHelper('icon');


export function Icon({ name, size, className }) {
	return (
		<span className={cn(null, { [name]: !!name, [`size-` + size]: !!size }, className)}/>
	)
}
