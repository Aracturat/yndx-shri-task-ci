import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from "react-intl";

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

import { Build } from "@ci-server/config-server/src/models/build";

import { BUILDS_PER_PAGE } from '../constants';
import { AppState } from "../store/reducers";

import './BuildHistoryPage.scss';

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

    const goToSettingsPage = useCallback(() => {
        history.push('/settings');
    }, [history]);

    const goToBuildDetailsPage = useCallback((buildId: string) => {
        history.push(`/build/${buildId}`);
    }, [history]);

    const loadMoreBuilds = useCallback(() => {
        dispatch(getBuilds(BUILDS_PER_PAGE, builds.length));
    }, [dispatch, builds.length]);

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
                        >
                            <FormattedMessage id="BuildHistoryPage.HeaderButtons.RunBuild" />
                        </Button>}
                    />
                    <Button small icon="gear" className={cn('settings-button')} onClick={goToSettingsPage} />
                </>
            }
        >
            { !isLoading && builds.length === 0 && <Text><FormattedMessage id="BuildHistoryPage.NoBuilds" /></Text> }
            {
                builds.length > 0
                &&
				<ol className={cn('list')}>
                    { builds.map(build =>
                        <BuildInfoCard
                            key={build.id}
                            onClick={() => goToBuildDetailsPage(build.id)}
                            build={build}
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
				<Button small className={cn('show-more-button')} onClick={loadMoreBuilds}>
					<FormattedMessage id="BuildHistoryPage.Buttons.ShowMore" />
				</Button>
            }
        </Page>
    );
}
