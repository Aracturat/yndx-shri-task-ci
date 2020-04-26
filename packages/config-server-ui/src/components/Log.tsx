import React from 'react';
import Convert from 'ansi-to-html';

import { bemHelper } from '../bem-helper';

import './Log.scss';


const cn = bemHelper('log');
const convert = new Convert({ fg: '#000', bg: '#000' });

interface LogProps {
	text: string;
	className?: string;
}

export function Log({ text, className }: LogProps) {
	const convertedText = convert.toHtml(text);

	return (
		<pre className={cn(undefined, undefined, className)} dangerouslySetInnerHTML={{ __html: convertedText }} />
	)
}
