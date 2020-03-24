import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { BuildInfoCard } from '../components/BuildInfoCard';

export function BuildHistory() {
	return (
		<div className="page build-history-page">
			<Header
				className="page__header"
				leftContent={
					<h1 className="header-text">philip1967/my-awesome-repo</h1>
				}
				rightContent={
					<>
						<Button small icon="start" className="build-history-page__run-build-button">Run build</Button>
						<Button small icon="gear" className="build-history-page__settings-button"/>
					</>
				}
			/>
			<main className="page__main main">
				<div className="main__content">
					<ol className="build-history-page__list">
						<BuildInfoCard tag="li" withHover/>
						<BuildInfoCard tag="li" withHover/>
						<BuildInfoCard tag="li" withHover/>
						<BuildInfoCard tag="li" withHover/>
						<BuildInfoCard tag="li" withHover/>
					</ol>
					<Button small className="build-history-page__show-more-button">Show more</Button>
				</div>
			</main>
			<Footer />
		</div>
	);
}
