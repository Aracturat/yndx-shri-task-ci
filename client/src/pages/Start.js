import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export function Start() {
	return (
		<div className="page start-page">
			<Header
				className="page__header"
				leftContent={
					<h1 className="header-text header-text--inactive">School CI server</h1>
				}
				rightContent={
					<button className="button button--small">
						<span className="button__icon icon icon--gear"></span>
						<span className="button__text">Settings</span>
					</button>
				}
			/>
			<main className="page__main main">
				<div className="main__content start-page__content">
					<div className="start-page__image"></div>
					<div className="start-page__description text text--size-s">Configure repository connection and synchronization settings</div>
					<button className="start-page__button button button--action">
						<span className="button__text">Open settings</span>
					</button>
				</div>
			</main>
			<Footer />
		</div>
	);
}
