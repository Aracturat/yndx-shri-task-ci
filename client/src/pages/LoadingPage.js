import React from 'react';

import { Page } from '../components/Page';
import { bemHelper } from '../bem-helper';

import './LoadingPage.scss';


const cn = bemHelper('loading-page');

export function LoadingPage() {
	return (
		<Page className={cn()}>
			<div className={cn("spinner-area")}>
				<div className={cn('spinner')}>
					<div className={cn('spinner-bar')}/>
					<div className={cn('spinner-bar')}/>
					<div className={cn('spinner-bar')}/>
				</div>
			</div>
		</Page>
	)
}
