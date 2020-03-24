import React from 'react';
import { bemHelper } from '../bem-helper';

const cn = bemHelper('log');

export function Log({ children, className }) {
	return (
		<pre className={cn(null, null, className)}>
			{children}
		</pre>
	)
}
