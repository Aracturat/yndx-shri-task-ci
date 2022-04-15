import React from 'react';
import { bemHelper } from '../bem-helper';

import "./Text.scss";


const cn = bemHelper('text');

interface TextProps {
	size?: 's' | 'm' | 'l' | 'xl';
	className?: string;
	children: React.ReactNode;
}

export const Text = React.memo(({ size = 's', children, className }: TextProps) => {
	return (
		<div className={cn(undefined, { [`size-` + size]: !!size }, className)}>{children}</div>
	)
});
