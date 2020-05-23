import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "../intl";

import { bemHelper } from '../bem-helper';
import { Header } from './Header';
import { HeaderText } from './HeaderText';
import { Footer } from './Footer';
import { Main } from './Main';

import "./Page.scss";
import { AppState } from "../store/reducers";

interface PageProps {
	children: React.ReactNode;
	headerButtons?: React.ReactNode;
	className?: string;
}


const cn = bemHelper('page');


export function Page({ children, headerButtons, className }: PageProps) {
	const repoName = useSelector<AppState, string | undefined>(state => state.settings?.repoName);
	const history = useHistory();

	const goToMainPage = () => {
		history.push(`/`);
	};

	return (
		<div className={cn(undefined, undefined, className)}>
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
