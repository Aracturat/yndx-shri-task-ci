import React from 'react';
import { bemHelper } from '../bem-helper';

import "./Main.scss";


const cn = bemHelper('main');

interface MainProps {
	children: React.ReactNode;
	className?: string;
}

export function Main({ children, className }: MainProps) {
	return (
		<main className={cn(undefined, undefined, className)}>
			<div className={cn('content')}>
				{children}
			</div>
		</main>
	)
}
