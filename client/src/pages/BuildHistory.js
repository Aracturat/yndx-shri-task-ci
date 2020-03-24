import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

export function BuildHistory() {
	return (
		<div className="page build-history-page">
			<Header
				className="page__header"
				leftContent={
					<h1 className="header-text">philip1967/my-awesome-repo</h1>
				}
				rightContent={
					<>
						<Button small icon="start" className="build-history-page__run-build-button">Run build</Button>
						<Button small icon="gear" className="build-history-page__settings-button"/>
					</>
				}
			/>
			<main className="page__main main">
				<div className="main__content">
					<ol className="build-history-page__list">
						<li className="build-info-card build-info-card--with-hover">
							<div className="build-info-card__status-icon icon icon--success"></div>
							<div className="build-info-card__commit-first-line">
								<div className="build-info-card__commit-number build-info-card__commit-number--success">#1368</div>
								<div className="build-info-card__commit-name">add documentation for postgres scaler</div>
							</div>
							<div className="build-info-card__commit-second-line">
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--branch icon--size-s "></div>
									<div className="text-with-icon__primary-text">master</div>
									<div className="text-with-icon__secondary-text">9c9f0b9</div>
								</div>
								<div className="text-with-icon build-info-card__author">
									<div className="text-with-icon__icon icon icon--person icon--size-s"></div>
									<div className="text-with-icon__primary-text">Philip Kirkorov</div>
								</div>
							</div>
							<div className="build-info-card__build-info">
								<div className="text-with-icon build-info-card__build-date">
									<div className="text-with-icon__icon icon icon--calendar icon--size-s"></div>
									<div className="text-with-icon__secondary-text">21 янв, 03:06</div>
								</div>
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--timer icon--size-s"></div>
									<div className="text-with-icon__secondary-text">1 ч 20 мин</div>
								</div>
							</div>
						</li>

						<li className="build-info-card build-info-card--with-hover">
							<div className="build-info-card__status-icon icon icon--error"></div>
							<div className="build-info-card__commit-first-line">
								<div className="build-info-card__commit-number build-info-card__commit-number--error">#1367</div>
								<div className="build-info-card__commit-name">Super cool UI kit for making websites that look like games</div>
							</div>
							<div className="build-info-card__commit-second-line">
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--branch icon--size-s "></div>
									<div className="text-with-icon__primary-text">super-cool-ui-kit</div>
									<div className="text-with-icon__secondary-text">952e5567</div>
								</div>
								<div className="text-with-icon build-info-card__author">
									<div className="text-with-icon__icon icon icon--person icon--size-s"></div>
									<div className="text-with-icon__primary-text">Vadim Makeev</div>
								</div>
							</div>
							<div className="build-info-card__build-info">
								<div className="text-with-icon build-info-card__build-date">
									<div className="text-with-icon__icon icon icon--calendar icon--size-s"></div>
									<div className="text-with-icon__secondary-text">21 янв, 03:06</div>
								</div>
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--timer icon--size-s"></div>
									<div className="text-with-icon__secondary-text">1 ч 20 мин</div>
								</div>
							</div>
						</li>

						<li className="build-info-card build-info-card--with-hover">
							<div className="build-info-card__status-icon icon icon--success"></div>
							<div className="build-info-card__commit-first-line">
								<div className="build-info-card__commit-number build-info-card__commit-number--success">#1366</div>
								<div className="build-info-card__commit-name">Merge branch 'master' of github.com:jaywcjlove/awesome</div>
							</div>
							<div className="build-info-card__commit-second-line">
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--branch icon--size-s "></div>
									<div className="text-with-icon__primary-text">master</div>
									<div className="text-with-icon__secondary-text">b4636ab</div>
								</div>
								<div className="text-with-icon build-info-card__author">
									<div className="text-with-icon__icon icon icon--person icon--size-s"></div>
									<div className="text-with-icon__primary-text">Philip Kirkorov</div>
								</div>
							</div>
							<div className="build-info-card__build-info">
								<div className="text-with-icon build-info-card__build-date">
									<div className="text-with-icon__icon icon icon--calendar icon--size-s"></div>
									<div className="text-with-icon__secondary-text">21 янв, 03:06</div>
								</div>
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--timer icon--size-s"></div>
									<div className="text-with-icon__secondary-text">1 ч 20 мин</div>
								</div>
							</div>
						</li>

						<li className="build-info-card build-info-card--with-hover">
							<div className="build-info-card__status-icon icon icon--pending"></div>
							<div className="build-info-card__commit-first-line">
								<div className="build-info-card__commit-number build-info-card__commit-number--pending">#1365</div>
								<div className="build-info-card__commit-name">upgrade typescript to 3.8</div>
							</div>
							<div className="build-info-card__commit-second-line">
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--branch icon--size-s "></div>
									<div className="text-with-icon__primary-text">master</div>
									<div className="text-with-icon__secondary-text">b4636ab</div>
								</div>
								<div className="text-with-icon build-info-card__author">
									<div className="text-with-icon__icon icon icon--person icon--size-s"></div>
									<div className="text-with-icon__primary-text">Philip Kirkorov</div>
								</div>
							</div>
							<div className="build-info-card__build-info">
								<div className="text-with-icon build-info-card__build-date">
									<div className="text-with-icon__icon icon icon--calendar icon--size-s"></div>
									<div className="text-with-icon__secondary-text">21 янв, 03:06</div>
								</div>
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--timer icon--size-s"></div>
									<div className="text-with-icon__secondary-text">1 ч 20 мин</div>
								</div>
							</div>
						</li>

						<li className="build-info-card build-info-card--with-hover">
							<div className="build-info-card__status-icon icon icon--success"></div>
							<div className="build-info-card__commit-first-line">
								<div className="build-info-card__commit-number build-info-card__commit-number--success">#1368</div>
								<div className="build-info-card__commit-name">add documentation for postgres scaler</div>
							</div>
							<div className="build-info-card__commit-second-line">
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--branch icon--size-s "></div>
									<div className="text-with-icon__primary-text">master</div>
									<div className="text-with-icon__secondary-text">b4636ab</div>
								</div>
								<div className="text-with-icon build-info-card__author">
									<div className="text-with-icon__icon icon icon--person icon--size-s"></div>
									<div className="text-with-icon__primary-text">Philip Kirkorov</div>
								</div>
							</div>
							<div className="build-info-card__build-info">
								<div className="text-with-icon build-info-card__build-date">
									<div className="text-with-icon__icon icon icon--calendar icon--size-s"></div>
									<div className="text-with-icon__secondary-text">21 янв, 03:06</div>
								</div>
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--timer icon--size-s"></div>
									<div className="text-with-icon__secondary-text">1 ч 20 мин</div>
								</div>
							</div>
						</li>

						<li className="build-info-card build-info-card--with-hover">
							<div className="build-info-card__status-icon icon icon--error"></div>
							<div className="build-info-card__commit-first-line">
								<div className="build-info-card__commit-number build-info-card__commit-number--error">#1367</div>
								<div className="build-info-card__commit-name">replace all `div` to `article`</div>
							</div>
							<div className="build-info-card__commit-second-line">
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--branch icon--size-s "></div>
									<div className="text-with-icon__primary-text">master</div>
									<div className="text-with-icon__secondary-text">952e5567</div>
								</div>
								<div className="text-with-icon build-info-card__author">
									<div className="text-with-icon__icon icon icon--person icon--size-s"></div>
									<div className="text-with-icon__primary-text">Vadim Makeev</div>
								</div>
							</div>
							<div className="build-info-card__build-info">
								<div className="text-with-icon build-info-card__build-date">
									<div className="text-with-icon__icon icon icon--calendar icon--size-s"></div>
									<div className="text-with-icon__secondary-text">21 янв, 03:06</div>
								</div>
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--timer icon--size-s"></div>
									<div className="text-with-icon__secondary-text">1 ч 20 мин</div>
								</div>
							</div>
						</li>

						<li className="build-info-card build-info-card--with-hover">
							<div className="build-info-card__status-icon icon icon--success"></div>
							<div className="build-info-card__commit-first-line">
								<div className="build-info-card__commit-number build-info-card__commit-number--success">#1362</div>
								<div className="build-info-card__commit-name">improved accessibility</div>
							</div>
							<div className="build-info-card__commit-second-line">
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--branch icon--size-s "></div>
									<div className="text-with-icon__primary-text">master</div>
									<div className="text-with-icon__secondary-text">e41e4cc</div>
								</div>
								<div className="text-with-icon build-info-card__author">
									<div className="text-with-icon__icon icon icon--person icon--size-s"></div>
									<div className="text-with-icon__primary-text">Philip Kirkorov</div>
								</div>
							</div>
							<div className="build-info-card__build-info">
								<div className="text-with-icon build-info-card__build-date">
									<div className="text-with-icon__icon icon icon--calendar icon--size-s"></div>
									<div className="text-with-icon__secondary-text">21 янв, 03:06</div>
								</div>
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--timer icon--size-s"></div>
									<div className="text-with-icon__secondary-text">1 ч 20 мин</div>
								</div>
							</div>
						</li>

						<li className="build-info-card build-info-card--with-hover">
							<div className="build-info-card__status-icon icon icon--success"></div>
							<div className="build-info-card__commit-first-line">
								<div className="build-info-card__commit-number build-info-card__commit-number--success">#1350</div>
								<div className="build-info-card__commit-name">fix: upload 别片类型</div>
							</div>
							<div className="build-info-card__commit-second-line">
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--branch icon--size-s "></div>
									<div className="text-with-icon__primary-text">master</div>
									<div className="text-with-icon__secondary-text">e41e4cc</div>
								</div>
								<div className="text-with-icon build-info-card__author">
									<div className="text-with-icon__icon icon icon--person icon--size-s"></div>
									<div className="text-with-icon__primary-text">Philip Kirkorov</div>
								</div>
							</div>
							<div className="build-info-card__build-info">
								<div className="text-with-icon build-info-card__build-date">
									<div className="text-with-icon__icon icon icon--calendar icon--size-s"></div>
									<div className="text-with-icon__secondary-text">21 янв, 03:06</div>
								</div>
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--timer icon--size-s"></div>
									<div className="text-with-icon__secondary-text">1 ч 20 мин</div>
								</div>
							</div>
						</li>

						<li className="build-info-card build-info-card--with-hover">
							<div className="build-info-card__status-icon icon icon--success"></div>
							<div className="build-info-card__commit-first-line">
								<div className="build-info-card__commit-number build-info-card__commit-number--success">#1349</div>
								<div className="build-info-card__commit-name">Form item has default height align with form size</div>
							</div>
							<div className="build-info-card__commit-second-line">
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--branch icon--size-s "></div>
									<div className="text-with-icon__primary-text">master</div>
									<div className="text-with-icon__secondary-text">e41e4cc</div>
								</div>
								<div className="text-with-icon build-info-card__author">
									<div className="text-with-icon__icon icon icon--person icon--size-s"></div>
									<div className="text-with-icon__primary-text">Philip Kirkorov</div>
								</div>
							</div>
							<div className="build-info-card__build-info">
								<div className="text-with-icon build-info-card__build-date">
									<div className="text-with-icon__icon icon icon--calendar icon--size-s"></div>
									<div className="text-with-icon__secondary-text">21 янв, 12:06</div>
								</div>
								<div className="text-with-icon">
									<div className="text-with-icon__icon icon icon--timer icon--size-s"></div>
									<div className="text-with-icon__secondary-text">1 ч 20 мин</div>
								</div>
							</div>
						</li>
					</ol>
					<Button small className="build-history-page__show-more-button">Show more</Button>
				</div>
			</main>
			<Footer />
		</div>
	);
}
