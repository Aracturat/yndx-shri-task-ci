import React from 'react';
import { Button } from '../components/Button';
import { BuildInfoCard } from '../components/BuildInfoCard';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';

import "./BuildHistoryPage.scss";


const cn = bemHelper('build-history-page');


export function BuildHistoryPage() {
	return (
		<Page
			className={cn()}
			repoName="philip1967/my-awesome-repo"
			headerButtons={
				<>
					<Button small icon="start" className={cn('run-build-button')}>Run build</Button>
					<Button small icon="gear" className={cn('settings-button')} />
				</>
			}
		>
			<ol className={cn('list')}>
				<BuildInfoCard tag="li" withHover />
				<BuildInfoCard tag="li" withHover />
				<BuildInfoCard tag="li" withHover />
				<BuildInfoCard tag="li" withHover />
				<BuildInfoCard tag="li" withHover />
			</ol>
			<Button small className={cn('show-more-button')}>Show more</Button>
		</Page>
	);
}
