import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "../intl";

import { Button } from '../components/Button';
import { BuildInfoCard } from '../components/BuildInfoCard';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';
import { AppDispatch, clearBuilds, getBuilds } from '../store/actions';

import { ModalOpener } from '../components/ModalOpener';
import { NewBuildModal } from '../components/NewBuildModal';
import { Spinner } from '../components/Spinner';
import { Text } from '../components/Text';

import { BUILDS_PER_PAGE } from '../constants';

import './BuildHistoryPage.scss';
import { AppState } from "../store/reducers";
import { Build } from "@ci-server/config-server/src/models/build";


const cn = bemHelper('build-history-page');


export function BuildHistoryPage() {
    const dispatch = useDispatch<AppDispatch>();
    const builds = useSelector<AppState, Build[]>(state => state.builds);
    const hasMoreBuilds = useSelector<AppState, boolean>(state => state.hasMoreBuilds);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        dispatch(clearBuilds());
        dispatch(getBuilds()).then(() => setIsLoading(false));
        setIsLoading(true);
    }, [dispatch]);

    const goToSettingsPage = () => {
        history.push('/settings');
    };

    const goToBuildDetailsPage = (buildId: string) => {
        history.push(`/build/${ buildId }`);
    };

    const loadMoreBuilds = () => {
        dispatch(getBuilds(BUILDS_PER_PAGE, builds.length));
    };

    return (
        <Page
            className={ cn() }
            headerButtons={
                <>
                    <ModalOpener
                        modal={ ({ closeModal }) => <NewBuildModal closeModal={ closeModal } /> }
                        opener={ ({ openModal }) => <Button small
                            icon="start"
                            className={ cn('run-build-button') }
                            onClick={ openModal }
                        >Run build</Button> }
                    />
                    <Button small icon="gear" className={ cn('settings-button') } onClick={ goToSettingsPage } />
                </>
            }
        >
            { !isLoading && builds.length === 0 &&
			<Text>We don't have builds yet. Press 'Run build' button for a new build.</Text> }
            {
                builds.length > 0
                &&
				<ol className={ cn('list') }>
                    { builds.map(build =>
                        <BuildInfoCard
                            key={ build.id }
                            onClick={ () => goToBuildDetailsPage(build.id) }
                            build={ build }
                            tag="li"
                            withHover
                        />) }
				</ol>
            }
            {
                isLoading
                &&
				<Spinner />
            }
            {
                hasMoreBuilds
                &&
				<Button small className={ cn('show-more-button') } onClick={ loadMoreBuilds }>Show more</Button>
            }
        </Page>
    );
}
