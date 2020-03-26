import React from 'react';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import { HeaderText } from '../components/HeaderText';
import { Text } from '../components/Text';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';

import "./SettingsPage.scss";


const cn = bemHelper('settings-page');


export function SettingsPage() {
	return (
		<Page className={cn()}>
			<div className={cn('form')}>
				<HeaderText small className={cn('header')}>Settings</HeaderText>
				<Text className={cn('description')}>Configure repository connection and synchronization settings</Text>

				<FormField required label="Github repository" placeholder="user-name/repo-name" />
				<FormField value="npm ci && npm run build" label="Build command" />
				<FormField value="master" label="Main branch" />
				<FormField inline value="10" label="Synchronize every" afterElement="minutes" />

				<div className={cn('buttons')}>
					<Button action>Save</Button>
					<Button>Cancel</Button>
				</div>
			</div>
		</Page>
	);
}
