import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/Button';
import { BuildInfoCard } from '../components/BuildInfoCard';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';
import { getBuilds } from '../store/actions';

import './BuildHistoryPage.scss';
import { ModalOpener } from '../components/ModalOpener';
import { NewBuildModal } from '../components/NewBuildModal';


const cn = bemHelper('build-history-page');


export function BuildHistoryPage() {
	const dispatch = useDispatch();
	const builds = useSelector(state => state.builds);
	const history = useHistory();

	useEffect(() => {
		dispatch(getBuilds());
	}, []);

	const goToSettingsPage = () => {
		history.push('/settings');
	};

	const goToBuildDetailsPage = (buildId) => {
		history.push(`/build/${buildId}`);
	};

	return (
		<Page
			className={cn()}
			headerButtons={
				<>
					<ModalOpener
						modal={({ closeModal }) => <NewBuildModal closeModal={closeModal}/>}
						opener={({ openModal }) => <Button small icon="start" className={cn('run-build-button')} onClick={openModal}>Run build</Button>}
					/>
					<Button small icon="gear" className={cn('settings-button')} onClick={goToSettingsPage} />
				</>
			}
		>
			<ol className={cn('list')}>
				{builds.map(build =>
					<BuildInfoCard
						key={build.id}
						onClick={() => goToBuildDetailsPage(build.id)}
						build={build}
						tag="li"
						withHover
					/>)}
			</ol>
			<Button small className={cn('show-more-button')}>Show more</Button>
		</Page>
	);
}
