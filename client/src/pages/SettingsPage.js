import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import { HeaderText } from '../components/HeaderText';
import { Text } from '../components/Text';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';
import { updateSettings } from '../store/actions';

import './SettingsPage.scss';
import { ModalOpener } from '../components/ModalOpener';
import { ErrorModal } from '../components/ErrorModal';


const cn = bemHelper('settings-page');


export function SettingsPage() {
	const settings = useSelector(store => store.settings);
	const dispatch = useDispatch();
	const history = useHistory();

	const [repoName, setRepoName] = useState(settings.repoName);
	const [buildCommand, setBuildCommand] = useState(settings.buildCommand);
	const [mainBranch, setMainBranch] = useState(settings.mainBranch);
	const [period, setPeriod] = useState(settings.period);

	const [isFormValid, setIsFormValid] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		if (repoName) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}, [repoName, buildCommand, mainBranch, period]);

	const handleSave = (e) => {
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
			period
		};

		dispatch(updateSettings(newSettings))
			.then(() => {
				history.push('/');
			})
			.catch(err => {
				setError(err.error);
			})
			.finally(() => {
				setIsSaving(false)
			});
	};

	const handleCancel = () => {
		history.goBack();
	};

	const numberMask = (input) => {
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
					<Button action type="submit" onClick={handleSave} disabled={!isFormValid || isSaving}>Save</Button>
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
