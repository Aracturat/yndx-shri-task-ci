import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
				setIsSaving(false)
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

	return (
		<Page className={cn()}>
			<form className={cn('form')} onSubmit={handleSave}>
				<HeaderText small className={cn('header')}>Settings</HeaderText>
				<Text className={cn('description')}>Configure repository connection and synchronization settings</Text>

				<FormField
					value={repoName}
					onChange={setRepoName}
					required
					label="Github repository"
					placeholder="user-name/repo-name"
				/>
				<FormField
					value={buildCommand}
					onChange={setBuildCommand}
					required
					label="Build command"
					placeholder="npm ci && npm run build"
				/>
				<FormField
					value={mainBranch}
					onChange={setMainBranch}
					label="Main branch"
					placeholder="master"
				/>
				<FormField
					value={period}
					onChange={setPeriod}
					inline
					label="Synchronize every"
					placeholder="10"
					afterElement="minutes"
					mask={numberMask}
				/>

				<div className={cn('buttons')}>
					<Button action type="submit" disabled={!isFormValid || isSaving}>Save</Button>
					<Button onClick={handleCancel} disabled={isSaving}>Cancel</Button>
				</div>
			</form>
			{
				error
				&&
				<ModalOpener
					modal={({ closeModal }) =>
						<ErrorModal
							closeModal={closeModal}
							error={error}
						/>}
				/>
			}
		</Page>
	);
}
