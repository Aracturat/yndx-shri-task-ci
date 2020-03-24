import React from "react";
import { bemHelper } from '../bem-helper';

const cn = bemHelper('footer');

export function Footer({ className }) {
	return (
		<footer className={cn(null, null, className)}>
			<div className={cn("content")}>
				<div className={cn("left")}>
					<a className={cn("item", null, "link")} href="#">Support</a>
					<a className={cn("item", null, "link")} href="#">Learning</a>
				</div>
				<div className={cn("right")}>
					<span className={cn("item", null, "text text--size-s")}>© 2020 Nikolay Dozmorov</span>
				</div>
			</div>
		</footer>
	)
}
