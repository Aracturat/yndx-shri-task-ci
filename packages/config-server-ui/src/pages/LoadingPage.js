import React from 'react';

import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';

import './LoadingPage.scss';
import { Spinner } from '../components/Spinner';


const cn = bemHelper('loading-page');

export function LoadingPage() {
	return (
		<Page className={cn()}>
			<Spinner />
		</Page>
	)
}
