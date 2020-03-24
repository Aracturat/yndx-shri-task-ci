import React from "react";
import { bemHelper } from '../bem-helper';
import { Link } from './Link';

const cn = bemHelper('footer');

export function Footer({ className }) {
	return (
		<footer className={cn(null, null, className)}>
			<div className={cn("content")}>
				<div className={cn("left")}>
					<Link className={cn("item")} href="#">Support</Link>
					<Link className={cn("item")} href="#">Learning</Link>
				</div>
				<div className={cn("right")}>
					<span className={cn("item", null, "text text--size-s")}>© 2020 Nikolay Dozmorov</span>
				</div>
			</div>
		</footer>
	)
}
