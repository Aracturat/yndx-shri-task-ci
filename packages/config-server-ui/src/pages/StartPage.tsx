import React from 'react';
import { useHistory } from "../intl";

import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';

import "./StartPage.scss";


const cn = bemHelper('start-page');


export function StartPage() {
	const history = useHistory();

	const goToSettingsPage = () => {
		history.push("/settings");
	};

	return (
		<Page
			className={cn()}
			headerButtons={
				<Button small icon="gear" onClick={goToSettingsPage}>Settings</Button>
			}
		>
			<div className={cn("content")}>
				<div className={cn("image")} />
				<Text className={cn("description")}>Configure repository connection and synchronization settings</Text>
				<Button action className={cn("button")} onClick={goToSettingsPage}>Open settings</Button>
			</div>
		</Page>
	);
}
