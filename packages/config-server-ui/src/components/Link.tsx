import React from 'react';
import { bemHelper } from '../bem-helper';

import "./Link.scss";


const cn = bemHelper('link');

interface LinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}


export function Link({ href, children, className }: LinkProps) {
	return (
		<a className={cn(undefined, undefined, className)} href={href}>{children}</a>
	)
}
