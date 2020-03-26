import React from 'react';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';

import "./StartPage.scss";


const cn = bemHelper('start-page');


export function StartPage() {
	return (
		<Page
			className={cn()}
			headerButtons={
				<Button small icon="gear">Settings</Button>
			}
		>
			<div className={cn("content")}>
				<div className={cn("image")} />
				<Text className={cn("description")}>Configure repository connection and synchronization settings</Text>
				<Button action className={cn("button")}>Open settings</Button>
			</div>
		</Page>
	);
}
