import React from 'react';
import { IntlShape, useIntl } from "react-intl";

import { bemHelper } from '../bem-helper';
import { Icon } from './Icon';

import { TextWithIcon } from './TextWithIcon';

import { Build } from "@ci-server/config-server/src/models/build";

import './BuildInfoCard.scss';


const cn = bemHelper('build-info-card');

/**
 * Format duration.
 */
function formatDuration(intl: IntlShape, duration?: number): string {
    if (duration == null) {
        return '-';
    }

    let minutes = Math.floor(duration / 60);
    let seconds = duration - 60 * minutes;
    let hours = Math.floor(minutes / 60);

    minutes = minutes - 60 * hours;

    const fractionUnits = [];

    if (hours) {
        fractionUnits.push(intl.formatNumber(hours, { style: 'unit', unit: 'hour' }));
    }
    if (minutes) {
        fractionUnits.push(intl.formatNumber(minutes, { style: 'unit', unit: 'minute' }));
    }

    fractionUnits.push(intl.formatNumber(seconds, { style: 'unit', unit: 'second' }));

    return intl.formatList(fractionUnits, { type: 'unit' });
}

function formatStart(intl: IntlShape, start?: string): string {
    if (!start) {
        return '-';
    }

    return intl.formatDate(new Date(start), {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });
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
    }: BuildInfoCardProps
) {
    const WrapperTag = tag as any;
    const intl = useIntl();

    const formattedStart = formatStart(intl, build.start);
    const formattedDuration = formatDuration(intl, build.duration);

    const statusModifier = convertStatusToCssModifier(build.status);

    return (
        <WrapperTag
            className={
                cn(undefined, {
                    'build-info-to-bottom': buildInfoToBottom,
                    'with-hover': withHover
                }, className)
            }
            onClick={ onClick }
        >
            <Icon name={ statusModifier } className={ cn('status-icon') } />
            <div className={ cn('commit-first-line') }>
                <div className={ cn('commit-number', { [statusModifier]: true }) }>#{ build.buildNumber }</div>
                <div className={ cn('commit-name') }>{ build.commitMessage }</div>
            </div>
            <div className={ cn('commit-second-line') }>
                <TextWithIcon icon="branch" primary={ build.branchName } secondary={ build.commitHash } />
                <TextWithIcon icon="person" primary={ build.authorName } />
            </div>
            <div className={ cn('build-info') }>
                <TextWithIcon icon="calendar" secondary={ formattedStart } />
                <TextWithIcon icon="timer" secondary={ formattedDuration } />
            </div>
        </WrapperTag>
    );
}
