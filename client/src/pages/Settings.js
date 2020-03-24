import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import { Main } from '../components/Main';

export function Settings() {
	return (
		<div className="page settings-page">
			<Header
				className="page__header"
				leftContent={
					<h1 className="header-text header-text--inactive">School CI server</h1>
				}
			/>
			<Main className="page__main">
				<div className="settings-page__form">
					<h2 className="header-text header-text--small settings-page__header">Settings</h2>
					<div className="text text--size-s settings-page__description">Configure repository connection and synchronization settings.</div>

					<FormField required label="Github repository" placeholder="user-name/repo-name" />
					<FormField value="npm ci && npm run build" label="Build command" />
					<FormField value="master" label="Main branch" />
					<FormField inline value="10" label="Synchronize every" afterElement="minutes" />

					<div className="settings-page__buttons">
						<Button action className="settings-page__button">Save</Button>
						<Button className="settings-page__button">Cancel</Button>
					</div>
				</div>
			</Main>
			<Footer />
		</div>
	);
}
