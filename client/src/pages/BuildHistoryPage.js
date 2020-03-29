import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/Button';
import { BuildInfoCard } from '../components/BuildInfoCard';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';
import { clearBuilds, getBuilds } from '../store/actions';

import './BuildHistoryPage.scss';
import { ModalOpener } from '../components/ModalOpener';
import { NewBuildModal } from '../components/NewBuildModal';
import { BUILDS_PER_PAGE } from '../constants';
import { Spinner } from '../components/Spinner';


const cn = bemHelper('build-history-page');


export function BuildHistoryPage() {
	const dispatch = useDispatch();
	const builds = useSelector(state => state.builds);
	const hasMoreBuilds = useSelector(state => state.hasMoreBuilds);
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);


	useEffect(() => {
		dispatch(clearBuilds());
		dispatch(getBuilds()).then(() => setIsLoading(false));
		setIsLoading(true);
	}, [dispatch]);

	const goToSettingsPage = () => {
		history.push('/settings');
	};

	const goToBuildDetailsPage = (buildId) => {
		history.push(`/build/${buildId}`);
	};

	const loadMoreBuilds = () => {
		dispatch(getBuilds(BUILDS_PER_PAGE, builds.length))
	};

	return (
		<Page
			className={cn()}
			headerButtons={
				<>
					<ModalOpener
						modal={({ closeModal }) => <NewBuildModal closeModal={closeModal} />}
						opener={({ openModal }) => <Button small
							icon="start"
							className={cn('run-build-button')}
							onClick={openModal}
						>Run build</Button>}
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
			{
				isLoading
				&&
				<Spinner />
			}
			{
				hasMoreBuilds
				&&
				<Button small className={cn('show-more-button')} onClick={loadMoreBuilds}>Show more</Button>
			}
		</Page>
	);
}
