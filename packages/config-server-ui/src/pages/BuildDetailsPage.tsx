import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from "react-intl";

import { useHistory } from "../intl";
import { Button } from '../components/Button';
import { BuildInfoCard } from '../components/BuildInfoCard';
import { Log } from '../components/Log';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';
import { Spinner } from '../components/Spinner';
import { LoadingPage } from './LoadingPage';
import { AppDispatch, getBuild, getBuildLogs, requestBuild } from '../store/actions';

import { AppState } from "../store/reducers";
import { Build } from "@ci-server/config-server/src/models/build";

import { BuildLog } from "@ci-server/config-server/src/models/build-log";
import './BuildDetailsPage.scss';


const cn = bemHelper('build-details-page');


export function BuildDetailsPage() {
	const { buildId } = useParams<{ buildId: string | undefined }>();
	const history = useHistory();
	const { formatMessage: f } = useIntl();

	const dispatch = useDispatch<AppDispatch>();
	const build = useSelector<AppState, Build | undefined>(state => state.builds.filter(e => e.id === buildId).shift());
	const buildLog = useSelector<AppState, BuildLog | undefined>(state => state.buildLogs.filter(e => e.id === buildId).shift());
	const [isRebuild, setIsRebuild] = useState<boolean>(false);

	useEffect(() => {
		if (!buildId) {
			return;
		}

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
		if (isRebuild || !build) {
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
						<FormattedMessage id="BuildDetailsPage.HeaderButtons.Rebuild"/>
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
				? <Log text={buildLog.text || f({id: 'BuildDetails.NoLog'})} />
				: <div className={cn('spinner-area')}><Spinner/></div>}
		</Page>
	);
}
