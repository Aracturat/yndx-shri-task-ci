import React, { MouseEvent } from 'react';
import { FormattedMessage, useIntl } from "react-intl";

import { bemHelper } from '../bem-helper';
import { Link } from './Link';
import { Text } from './Text';
import { getLocaleAfterSwitch, useHistory } from "../intl";

import "./Footer.scss";


const cn = bemHelper('footer');

interface FooterProps {
	className?: string;
}

export function Footer({ className }: FooterProps) {
	const history = useHistory();
	const { locale } = useIntl();
	const newLocale = getLocaleAfterSwitch(locale);

	const switchToMessageId = newLocale === 'ru' ? 'Footer.Links.SwitchToRu' : 'Footer.Links.SwitchToEn';

	const handleSwitchLocale = (event: MouseEvent) => {
		event.preventDefault();

		history.changeLocale(newLocale);
	};

	return (
		<footer className={cn(undefined, undefined, className)}>
			<div className={cn('content')}>
				<div className={cn('left')}>
					<Link className={cn('item')} href="#">
						<FormattedMessage id="Footer.Links.Support"/>
					</Link>
					<Link className={cn('item')} href="#">
						<FormattedMessage id="Footer.Links.Learning"/>
					</Link>
					<Link className={cn('item')} href="#" onClick={handleSwitchLocale}>
						<FormattedMessage id={switchToMessageId}/>
					</Link>
				</div>
				<div className={cn('right')}>
					<Text className={cn('item')}>
						<FormattedMessage id="Footer.Copyright"/>
					</Text>
				</div>
			</div>
		</footer>
	)
}
