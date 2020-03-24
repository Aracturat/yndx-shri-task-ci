import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

export function Start() {
	return (
		<div className="page start-page">
			<Header
				className="page__header"
				leftContent={
					<h1 className="header-text header-text--inactive">School CI server</h1>
				}
				rightContent={
					<Button small icon="gear">Settings</Button>
				}
			/>
			<main className="page__main main">
				<div className="main__content start-page__content">
					<div className="start-page__image"></div>
					<div className="start-page__description text text--size-s">Configure repository connection and synchronization settings</div>
					<Button action className="start-page__button" >Open settings</Button>
				</div>
			</main>
			<Footer />
		</div>
	);
}
