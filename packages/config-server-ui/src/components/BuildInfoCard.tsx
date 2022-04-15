import React from 'react';
import { bemHelper } from '../bem-helper';
import { Icon } from './Icon';
import { TextWithIcon } from './TextWithIcon';
import { format } from 'date-fns'

import { Build } from "@ci-server/config-server/src/models/build";

import './BuildInfoCard.scss';


const cn = bemHelper('build-info-card');

/**
 * Format duration.
 * @param duration in seconds
 */
function formatDuration(duration?: number): string {
	if (!duration) {
		return '- h -- min';
	}

	let minutes = Math.floor(duration / 60);
	const seconds = duration - 60 * minutes;
	const hours = Math.floor(minutes / 60);

	minutes = minutes - 60 * hours;

	if (hours) {
		return `${hours} h ${minutes} min`;
	}
	if (minutes) {
		return `${minutes} m ${seconds} sec`;
	}

	return `${seconds} sec`
}

function formatStart(start?: string): string {
	if (!start) {
		return '- ---, --:--';
	}

	return format(new Date(start), 'd MMM, kk:HH');
}

type StatusCssModifier = 'success' | 'error' | 'pending';

function convertStatusToCssModifier(status: string): StatusCssModifier {
	const mapper: Record<string, StatusCssModifier> = {
		'Success': 'success',
		'Fail': 'error',
		'Waiting': 'pending',
		'InProgress': 'pending',
		'Canceled': 'error'
	};

	return mapper[status];
}

interface BuildInfoCardProps {
	build: Build;
	buildInfoToBottom?: boolean;
	withHover?: boolean;
	tag?: string;
	className?: string;
	onClick?: () => void;
}

export function BuildInfoCard(
	{
		build,
		buildInfoToBottom = false,
		withHover = false,
		tag = 'div',
		className = '',
		onClick
	} : BuildInfoCardProps
) {
	const WrapperTag = tag as any;

	const formattedStart = formatStart(build.start);
	const formattedDuration = formatDuration(build.duration);

	const statusModifier = convertStatusToCssModifier(build.status);

	return (
		<WrapperTag
			className={
				cn(undefined, {
					'build-info-to-bottom': buildInfoToBottom,
					'with-hover': withHover
				}, className)
			}
			onClick={onClick}
		>
			<Icon name={statusModifier} className={cn('status-icon')} />
			<div className={cn('commit-first-line')}>
				<div className={cn('commit-number', { [statusModifier]: true })}>#{build.buildNumber}</div>
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
