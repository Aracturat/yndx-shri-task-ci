import React from 'react';
import { bemHelper } from '../bem-helper';

const cn = bemHelper('link');


export function Link({ href, children, className }) {
	return (
		<a className={cn(null, null, className)} href={href}>{children}</a>
	)
}
