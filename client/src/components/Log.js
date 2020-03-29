import React from 'react';
import Convert from 'ansi-to-html';

import { bemHelper } from '../bem-helper';

import "./Log.scss";


const cn = bemHelper('log');
const convert = new Convert();


export function Log({ text, className }) {
	const convertedText = convert.toHtml(text);

	return (
		<pre className={cn(null, null, className)} dangerouslySetInnerHTML={{ __html: convertedText }}/>
	)
}
