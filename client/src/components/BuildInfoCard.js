import React from 'react';
import { bemHelper } from '../bem-helper';
import { Icon } from './Icon';
import { TextWithIcon } from './TextWithIcon';
import { format } from 'date-fns'

import './BuildInfoCard.scss';


const cn = bemHelper('build-info-card');

/**
 * Format duration.
 * @param duration in seconds
 */
function formatDuration(duration) {
	let minutes = Math.floor(duration / 60);
	let seconds = duration - 60 * minutes;
	let hours = Math.floor(minutes / 60);

	minutes = minutes - 60 * hours;

	if (hours) {
		return `${hours} h ${minutes} min`;
	}
	if (minutes) {
		return `${minutes} m ${seconds} sec`;
	}

	return `${seconds} sec`
}

export function BuildInfoCard(
	{
		build,
		buildInfoToBottom,
		withHover,
		tag = 'div',
		className = '',
		onClick
	}
) {
	const WrapperTag = tag;

	const formattedStart = format(new Date(build.start), 'd MMM, kk:HH');
	const formattedDuration = formatDuration(build.duration);


	return (
		<WrapperTag
			className={
				cn(null, {
					'buildInfo-info-to-bottom': buildInfoToBottom,
					'with-hover': withHover
				}, className)
			}
			onClick={onClick}
		>
			<Icon name={build.status.toLowerCase()} className={cn('status-icon')} />
			<div className={cn('commit-first-line')}>
				<div className={cn('commit-number', { 'success': build.status === 'Success' })}>#{build.buildNumber}</div>
				<div className={cn('commit-name')}>{build.commitMessage}</div>
			</div>
			<div className={cn('commit-second-line')}>
				<TextWithIcon icon="branch" primary={build.branchName} secondary={build.commitHash} />
				<TextWithIcon icon="person" primary={build.authorName} />
			</div>
			<div className={cn('build-info')}>
				<TextWithIcon icon="calendar" secondary={formattedStart} />
				<TextWithIcon icon="timer" secondary={formattedDuration} />
			</div>
		</WrapperTag>
	)
}
