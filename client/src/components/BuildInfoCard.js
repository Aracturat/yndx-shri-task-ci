import React from 'react';
import { bemHelper } from '../bem-helper';
import { Icon } from './Icon';

const cn = bemHelper('build-info-card');

export function BuildInfoCard({ buildInfoToBottom, withHover, tag = 'div', className = '' }) {
	let WrapperTag = tag;

	return (
		<WrapperTag className={cn(null, { 'build-info-to-bottom': buildInfoToBottom, 'with-hover': withHover }, className)}>
			<Icon name="success" className="build-info-card__status-icon" />
			<div className="build-info-card__commit-first-line">
				<div className="build-info-card__commit-number build-info-card__commit-number--success">#1368</div>
				<div className="build-info-card__commit-name">add documentation for postgres scaler</div>
			</div>
			<div className="build-info-card__commit-second-line">
				<div className="text-with-icon">
					<Icon name="branch" size="s" className="text-with-icon__icon" />
					<div className="text-with-icon__primary-text">master</div>
					<div className="text-with-icon__secondary-text">9c9f0b9</div>
				</div>
				<div className="text-with-icon build-info-card__author">
					<Icon name="person" size="s" className="text-with-icon__icon" />
					<div className="text-with-icon__primary-text">Philip Kirkorov</div>
				</div>
			</div>
			<div className="build-info-card__build-info">
				<div className="text-with-icon build-info-card__build-date">
					<Icon name="calendar" size="s" className="text-with-icon__icon" />
					<div className="text-with-icon__secondary-text">21 янв, 03:06</div>
				</div>
				<div className="text-with-icon">
					<Icon name="timer" size="s" className="text-with-icon__icon" />
					<div className="text-with-icon__secondary-text">1 ч 20 мин</div>
				</div>
			</div>
		</WrapperTag>
	)
}
