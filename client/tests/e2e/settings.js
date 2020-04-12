import { expect } from 'chai';

import { SettingsPage } from './page-objects/settings.page';
import { ErrorModal } from './page-objects/error.modal';
import { BuildHistoryPage } from './page-objects/build-history.page';

describe('Страница настроек', () => {
	const page = new SettingsPage();

	const correctSettings = {
		repo: 'Aracturat/yndx-shri-task-ci',
		buildCommand: 'npm ci',
		mainBranch: 'master',
		period: '100'
	};

	beforeEach(() => {
		page.open();
	});

	it('должна позволять ввести новые настройки', () => {
		page.fill(correctSettings);

		expect(page.repo.getValue()).to.equal(correctSettings.repo);
		expect(page.buildCommand.getValue()).to.equal(correctSettings.buildCommand);
		expect(page.mainBranch.getValue()).to.equal(correctSettings.mainBranch);
		expect(page.period.getValue()).to.equal(correctSettings.period);
		expect(page.saveButton.isEnabled()).to.equal(true);
	});

	it('должна позволять сохранять настройки', () => {
		page.fill(correctSettings);
		page.save();

		const buildHistoryPage = new BuildHistoryPage();

		browser.waitUntil(() => buildHistoryPage.isVisible, { timeout: 60000 })
	});

	it('должна показывать ошибку, если неверный репозиторий', () => {
		const badConfig = {
			...correctSettings,
			repo: 'test/test'
		};

		page.fill(badConfig);
		page.save();

		const errorModal = new ErrorModal();
		errorModal.text.waitForDisplayed({ timeout: 60000 });
		expect(errorModal.text.getText()).to.equal('Repository not found');
	});
});

