import React from "react";
import { bemHelper } from '../bem-helper';

const cn = bemHelper('header');

export function Header({ leftContent, rightContent, className }) {
	return (
		<header className={cn(null, null, className)}>
			<div className={cn("content")}>
				<div className={cn("left")}>
					{leftContent}
				</div>
				<div className={cn("right")}>
					{rightContent}
				</div>
			</div>
		</header>
	)
}
