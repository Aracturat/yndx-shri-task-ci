import React from 'react';

import { Page } from '../components/Page';
import { Spinner } from '../components/Spinner';

import { bemHelper } from '../bem-helper';

import './LoadingPage.scss';


const cn = bemHelper('loading-page');

export function LoadingPage() {
	return (
		<Page className={cn()}>
			<Spinner />
		</Page>
	)
}
