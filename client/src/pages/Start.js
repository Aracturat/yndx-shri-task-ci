import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Main } from '../components/Main';

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
			<Main className="page__main">
				<div className="start-page__content">
					<div className="start-page__image"/>
					<div className="start-page__description text text--size-s">Configure repository connection and synchronization settings</div>
					<Button action className="start-page__button">Open settings</Button>
				</div>
			</Main>
			<Footer />
		</div>
	);
}
