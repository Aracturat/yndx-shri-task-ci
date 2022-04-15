import React from "react";
import { bemHelper } from '../bem-helper';

import "./Header.scss";


const cn = bemHelper('header');

interface HeaderProps {
	leftContent: React.ReactNode;
	rightContent: React.ReactNode;
	className?: string;
	onLeftClick: () => void;
}

export const Header = React.memo(({ leftContent, rightContent, className, onLeftClick }: HeaderProps) => {
	return (
		<header className={cn(undefined, undefined, className)}>
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
});
