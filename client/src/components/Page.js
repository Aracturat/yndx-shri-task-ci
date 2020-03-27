import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { bemHelper } from '../bem-helper';
import { Header } from './Header';
import { HeaderText } from './HeaderText';
import { Footer } from './Footer';
import { Main } from './Main';

import "./Page.scss";


const cn = bemHelper('page');


export function Page({ children, headerButtons, className }) {
	const repoName = useSelector(state => state.settings.repoName);
	const history = useHistory();

	const goToMainPage = () => {
		history.push(`/`);
	};

	return (
		<div className={cn(null, null, className)}>
			<Header
				className={cn('header')}
				leftContent={
					repoName
						? <HeaderText>{repoName}</HeaderText>
						: <HeaderText inactive>School CI server</HeaderText>
				}
				rightContent={headerButtons}
				onLeftClick={goToMainPage}
			/>
			<Main className={cn('main')}>
				{children}
			</Main>
			<Footer className={cn('footer')} />
		</div>
	);
}
