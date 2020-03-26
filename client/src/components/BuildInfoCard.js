import React from 'react';
import { bemHelper } from '../bem-helper';
import { Icon } from './Icon';
import { TextWithIcon } from './TextWithIcon';

import "./BuildInfoCard.scss";


const cn = bemHelper('build-info-card');


export function BuildInfoCard({ buildInfoToBottom, withHover, tag = 'div', className = '' }) {
	let WrapperTag = tag;

	let config = {
		status: 'success',
		buildNumber: '1368',
		commitName: 'add documentation for postgres scaler',
		commitBranch: 'master',
		commitHash: '9c9f0b9',
		commitAuthor: 'Philip Kirkorov',
		buildDate: '21 янв, 03:06',
		buildDuration: '1 ч 20 мин'
	};

	return (
		<WrapperTag className={
			cn(null, {
				'build-info-to-bottom': buildInfoToBottom,
				'with-hover': withHover
			}, className)}
		>
			<Icon name={config.status} className={cn('status-icon')} />
			<div className={cn('commit-first-line')}>
				<div className={cn('commit-number', { 'success': config.status === 'success' })}>#{config.buildNumber}</div>
				<div className={cn('commit-name')}>{config.commitName}</div>
			</div>
			<div className={cn('commit-second-line')}>
				<TextWithIcon icon="branch" primary={config.commitBranch} secondary={config.commitHash} />
				<TextWithIcon icon="person" primary={config.commitAuthor} />
			</div>
			<div className={cn('build-info')}>
				<TextWithIcon icon="calendar" secondary={config.buildDate} />
				<TextWithIcon icon="timer" secondary={config.buildDuration} />
			</div>
		</WrapperTag>
	)
}
