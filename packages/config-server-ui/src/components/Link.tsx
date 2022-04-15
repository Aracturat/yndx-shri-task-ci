import React, { MouseEventHandler } from 'react';
import { bemHelper } from '../bem-helper';

import "./Link.scss";


const cn = bemHelper('link');

interface LinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	onClick?: MouseEventHandler
}

export const Link = React.memo(({ href, children, className, onClick }: LinkProps) => {
	return (
		<a className={cn(undefined, undefined, className)} href={href} onClick={onClick}>{children}</a>
	)
});
