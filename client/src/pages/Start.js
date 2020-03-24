import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Main } from '../components/Main';
import { HeaderText } from '../components/HeaderText';
import { Text } from '../components/Text';

export function Start() {
	return (
		<div className="page start-page">
			<Header
				className="page__header"
				leftContent={
					<HeaderText inactive>School CI server</HeaderText>
				}
				rightContent={
					<Button small icon="gear">Settings</Button>
				}
			/>
			<Main className="page__main">
				<div className="start-page__content">
					<div className="start-page__image"/>
					<Text className="start-page__description">Configure repository connection and synchronization settings</Text>
					<Button action className="start-page__button">Open settings</Button>
				</div>
			</Main>
			<Footer />
		</div>
	);
}
