import React from 'react';
import { bemHelper } from '../bem-helper';
import { Link } from './Link';
import { Text } from './Text';

import "./Footer.scss";


const cn = bemHelper('footer');

interface FooterProps {
	className?: string;
}

export function Footer({ className }: FooterProps) {
	return (
		<footer className={cn(undefined, undefined, className)}>
			<div className={cn('content')}>
				<div className={cn('left')}>
					<Link className={cn('item')} href="#">Support</Link>
					<Link className={cn('item')} href="#">Learning</Link>
				</div>
				<div className={cn('right')}>
					<Text className={cn('item')}>© 2020 Nikolay Dozmorov</Text>
				</div>
			</div>
		</footer>
	)
}
