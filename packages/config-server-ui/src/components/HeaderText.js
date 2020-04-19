import React from 'react';
import { bemHelper } from '../bem-helper';

import "./HeaderText.scss"


const cn = bemHelper('header-text');


export function HeaderText({ small, inactive, children, className }) {
	let WrapperTag = small ? 'h2' : 'h1';

	return (
		<WrapperTag className={cn(null, { small, inactive }, className)}>{children}</WrapperTag>
	)
}
