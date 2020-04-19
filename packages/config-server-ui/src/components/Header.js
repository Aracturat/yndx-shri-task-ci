import React from "react";
import { bemHelper } from '../bem-helper';

import "./Header.scss";


const cn = bemHelper('header');


export function Header({ leftContent, rightContent, className, onLeftClick }) {
	return (
		<header className={cn(null, null, className)}>
			<div className={cn("content")}>
				<div className={cn("left")} onClick={onLeftClick}>
					{leftContent}
				</div>
				<div className={cn("right")}>
					{rightContent}
				</div>
			</div>
		</header>
	)
}
