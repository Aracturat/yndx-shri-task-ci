import React from "react";

export function Header({ leftContent, rightContent, className }) {
	return (
		<header className={"header " + className || ""}>
			<div className="header__content">
				<div className="header__left">
					{leftContent}
				</div>
				<div className="header__right">
					{rightContent}
				</div>
			</div>
		</header>
	)
}
