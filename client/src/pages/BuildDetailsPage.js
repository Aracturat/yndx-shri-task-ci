import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { BuildInfoCard } from '../components/BuildInfoCard';
import { Log } from '../components/Log';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';

import { LoadingPage } from './LoadingPage';
import { getBuild, getBuildLogs } from '../store/actions';

import './BuildDetailsPage.scss';


const cn = bemHelper('build-details-page');


export function BuildDetailsPage() {
	const { buildId } = useParams();
	const history = useHistory();

	const dispatch = useDispatch();
	const build = useSelector(state => state.builds.filter(e => e.id === buildId).shift());
	const buildLog = useSelector(state => state.buildLogs.filter(e => e.id === buildId).shift());

	if (!build) {
		dispatch(getBuild(buildId));

		return <LoadingPage />;
	}

	if (!buildLog) {
		dispatch(getBuildLogs(buildId));
	}

	const goToSettingsPage = () => {
		history.push('/settings');
	};

	return (
		<Page
			className={cn()}
			headerButtons={
				<>
					<Button small icon="restart" className={cn('restart-build-button')}>Rebuild</Button>
					<Button small icon="gear" className={cn('settings-button')} onClick={goToSettingsPage} />
				</>
			}
		>
			<BuildInfoCard build={build} buildInfoToBottom className={cn('build-info')} />
			{buildLog && <Log text={buildLog.text} />}
		</Page>
	);
}
