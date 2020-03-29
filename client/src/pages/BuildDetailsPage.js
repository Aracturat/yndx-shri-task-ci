import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { BuildInfoCard } from '../components/BuildInfoCard';
import { Log } from '../components/Log';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';
import { Spinner } from '../components/Spinner';
import { LoadingPage } from './LoadingPage';
import { getBuild, getBuildLogs, requestBuild } from '../store/actions';

import './BuildDetailsPage.scss';


const cn = bemHelper('build-details-page');


export function BuildDetailsPage() {
	const { buildId } = useParams();
	const history = useHistory();

	const dispatch = useDispatch();
	const build = useSelector(state => state.builds.filter(e => e.id === buildId).shift());
	const buildLog = useSelector(state => state.buildLogs.filter(e => e.id === buildId).shift());
	const [isRebuild, setIsRebuild] = useState(false);

	useEffect(() => {
		if (!build) {
			dispatch(getBuild(buildId));
		}

		if (!buildLog) {
			dispatch(getBuildLogs(buildId));
		}
	});

	const goToSettingsPage = () => {
		history.push('/settings');
	};

	const handleRebuild = () => {
		if (isRebuild) {
			return;
		}
		setIsRebuild(true);

		dispatch(requestBuild(build.commitHash))
			.then(newBuild => {
				setIsRebuild(false);
				history.push(`/build/${newBuild.id}`);
			});
	};

	if (!build) {
		return <LoadingPage/>;
	}

	return (
		<Page
			className={cn()}
			headerButtons={
				<>
					<Button
						small
						icon="restart"
						className={cn('restart-build-button')}
						onClick={handleRebuild}
						disabled={isRebuild}
					>
						Rebuild
					</Button>
					<Button
						small
						icon="gear"
						className={cn('settings-button')}
						onClick={goToSettingsPage}
					/>
				</>
			}
		>
			<BuildInfoCard build={build} buildInfoToBottom className={cn('build-info')} />
			{
				buildLog
				? <Log text={buildLog.text || 'Log is empty.'} />
				: <div className={cn('spinner-area')}><Spinner/></div>}
		</Page>
	);
}
