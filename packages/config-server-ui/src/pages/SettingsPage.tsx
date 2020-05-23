import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from "react-intl";

import { useHistory } from "../intl";
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import { HeaderText } from '../components/HeaderText';
import { Text } from '../components/Text';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';

import { AppDispatch, updateSettings } from '../store/actions';
import { ModalOpener } from '../components/ModalOpener';

import { ErrorModal } from '../components/ErrorModal';
import { AppState } from "../store/reducers";
import { Settings } from "@ci-server/config-server/src/models/settings";
import { ServerError } from "@ci-server/config-server/src/models/error";

import './SettingsPage.scss';


const cn = bemHelper('settings-page');


export function SettingsPage() {
    const settings = useSelector<AppState, Settings | null>(store => store.settings);
    const dispatch = useDispatch<AppDispatch>();
    const history = useHistory();
    const { formatMessage: f } = useIntl();

    const [repoName, setRepoName] = useState<string>(settings?.repoName ?? "");
    const [buildCommand, setBuildCommand] = useState<string>(settings?.buildCommand ?? "");
    const [mainBranch, setMainBranch] = useState<string>(settings?.mainBranch ?? "");
    const [period, setPeriod] = useState<string>((settings?.period ?? 0).toString());

    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (repoName && buildCommand) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [repoName, buildCommand, mainBranch, period]);

    const handleSave = (e: FormEvent) => {
        e.preventDefault();

        if (isSaving) {
            return;
        }
        setIsSaving(true);
        setError(null);

        const newSettings = {
            repoName,
            buildCommand,
            mainBranch,
            period: +period
        } as Settings;

        dispatch(updateSettings(newSettings))
            .then(() => {
                history.push('/');
            })
            .catch((err: ServerError) => {
                setError(err.error);
            })
            .finally(() => {
                setIsSaving(false);
            });
    };

    const handleCancel = () => {
        history.goBack();
    };

    const numberMask = (input: string) => {
        return input
            .split('')
            .filter(e => /\d/.test(e))
            .map(_ => /\d/);
    };

    const [formattedPeriod, setFormattedPeriod] = useState<{ label: string, afterElement: string }>();

    useEffect(() => {
        const formatted = f({ id: 'SettingsPage.Fields.Period.Label' }, { period });
        const [label, afterElement] = formatted.split('#').map(e => e.trim());

        setFormattedPeriod({ label, afterElement });
    }, [period]);


    return (
        <Page className={ cn() }>
            <form className={ cn('form') } onSubmit={ handleSave }>
                <HeaderText small className={ cn('header') }>
                    <FormattedMessage id="SettingsPage.Header" />
                </HeaderText>
                <Text className={ cn('description') }>
                    <FormattedMessage id="SettingsPage.Description" />
                </Text>

                <FormField
                    value={ repoName }
                    onChange={ setRepoName }
                    required
                    label={ f({ id: 'SettingsPage.Fields.GithubRepository.Label' }) }
                    placeholder={ f({ id: 'SettingsPage.Fields.GithubRepository.Placeholder' }) }
                />
                <FormField
                    value={ buildCommand }
                    onChange={ setBuildCommand }
                    required
                    label={ f({ id: 'SettingsPage.Fields.BuildCommand.Label' }) }
                    placeholder={ f({ id: 'SettingsPage.Fields.BuildCommand.Placeholder' }) }
                />
                <FormField
                    value={ mainBranch }
                    onChange={ setMainBranch }
                    label={ f({ id: 'SettingsPage.Fields.MainBranch.Label' }) }
                    placeholder={ f({ id: 'SettingsPage.Fields.MainBranch.Placeholder' }) }
                />
                <FormField
                    value={ period }
                    onChange={ setPeriod }
                    inline
                    label={ formattedPeriod?.label }
                    placeholder={ f({ id: 'SettingsPage.Fields.Period.Placeholder' }) }
                    afterElement={ formattedPeriod?.afterElement }
                    mask={ numberMask }
                />

                <div className={ cn('buttons') }>
                    <Button action type="submit" disabled={ !isFormValid || isSaving }>
                        <FormattedMessage id="SettingsPage.Buttons.Save" />
                    </Button>
                    <Button onClick={ handleCancel } disabled={ isSaving }>
                        <FormattedMessage id="SettingsPage.Buttons.Cancel" />
                    </Button>
                </div>
            </form>
            {
                error
                &&
				<ModalOpener
					modal={ ({ closeModal }) =>
                        <ErrorModal
                            closeModal={ closeModal }
                            error={ error }
                        /> }
				/>
            }
        </Page>
    );
}
