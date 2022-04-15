import React, { useCallback } from 'react';
import { FormattedMessage } from "react-intl";

import { useHistory } from "../intl";
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Page } from '../components/Page';

import { bemHelper } from '../bem-helper';

import "./StartPage.scss";


const cn = bemHelper('start-page');

export function StartPage() {
    const history = useHistory();

    const goToSettingsPage = useCallback(() => {
        history.push("/settings");
    }, [history]);

    return (
        <Page
            className={cn()}
            headerButtons={
                <Button small icon="gear" onClick={goToSettingsPage}>
                    <FormattedMessage id="StartPage.HeaderButtons.Settings" />
                </Button>
            }
        >
            <div className={cn("content")}>
                <div className={cn("image")} />
                <Text className={cn("description")}>
                    <FormattedMessage id="StartPage.HeaderButtons.Description" />
                </Text>
                <Button action className={cn("button")} onClick={goToSettingsPage}>
                    <FormattedMessage id="StartPage.Buttons.OpenSettings" />
                </Button>
            </div>
        </Page>
    );
}
