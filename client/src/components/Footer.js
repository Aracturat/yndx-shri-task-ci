import React from "react";

export function Footer() {
	return (
		<footer className="page__footer footer">
			<div className="footer__content">
				<div className="footer__left">
					<a className="footer__item link" href="#">Support</a>
					<a className="footer__item link" href="#">Learning</a>
				</div>
				<div className="footer__right">
					<span className="footer__item text text--size-s">© 2020 Nikolay Dozmorov</span>
				</div>
			</div>
		</footer>
	)
}
