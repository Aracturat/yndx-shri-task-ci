import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Settings() {
	return (
		<div className="page settings-page">
			<Header
				className="page__header"
				leftContent={
					<h1 className="header-text header-text--inactive">School CI server</h1>
				}
			/>
			<main className="page__main main">
				<div className="main__content">
					<div className="settings-page__form">
						<h2 className="header-text header-text--small settings-page__header">Settings</h2>
						<div className="text text--size-s settings-page__description">Configure repository connection and synchronization settings.</div>
						<div className="form-field form-field--required">
							<label className="form-field__label" htmlFor="repository">Github repository</label>
							<input className="form-field__input"
								type="text"
								placeholder="user-name/repo-name"
								id="repository"
							/>
						</div>
						<div className="form-field">
							<label className="form-field__label" htmlFor="command">Build command</label>
							<input className="form-field__input"
								type="text"
								value="npm ci && npm run build"
								id="command"
							/>
							<span className="form-field__clear-button"></span>
						</div>
						<div className="form-field">
							<label className="form-field__label" htmlFor="branch">Main branch</label>
							<input className="form-field__input" type="text" value="master" id="branch" />
							<span className="form-field__clear-button"></span>
						</div>
						<div className="form-field form-field--inline">
							<label className="form-field__label" htmlFor="minutes">Synchronize every</label>
							<input className="form-field__input settings-page__minutes-input"
								type="text"
								value="10"
								id="minutes"
							/>
							<span className="form-field__after-element">minutes</span>
						</div>
						<div className="settings-page__buttons">
							<button className="button button--action settings-page__button">
								<span className="button__text">Save</span>
							</button>
							<button className="button settings-page__button">
								<span className="button__text">Cancel</span>
							</button>
						</div>
					</div>
				</div>
			</main>
			<Footer/>
		</div>
	);
}
