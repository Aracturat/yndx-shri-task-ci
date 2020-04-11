const { expect } = require('chai');
const { SettingsPage } = require('./page-objects/settings.page');
const { ErrorModal } = require('./page-objects/error-modal.page');

describe('Страница настроек', () => {
	const page = new SettingsPage();

	const correctConfig = {
		repo: 'Aracturat/yndx-shri-task-ci',
		buildCommand: 'npm ci',
		mainBranch: 'master',
		period: '100'
	};

	beforeEach(() => {
		page.open();
	});

	it('должна позволять ввести новые настройки', () => {
		page.fill(correctConfig);

		expect(page.repo.getValue()).to.equal(correctConfig.repo);
		expect(page.buildCommand.getValue()).to.equal(correctConfig.buildCommand);
		expect(page.mainBranch.getValue()).to.equal(correctConfig.mainBranch);
		expect(page.period.getValue()).to.equal(correctConfig.period);
		expect(page.saveButton.isEnabled()).to.equal(true);
	});

	it('должна позволять сохранять настройки', () => {
		page.fill(correctConfig);
		page.save();

		browser.waitUntil(() => $$('.build-history-page').length > 0, { timeout: 60000 })
	});

	it('должна показывать ошибку, если неверный репозиторий', () => {
		const badConfig = {
			...correctConfig,
			repo: 'test/test'
		};

		page.fill(badConfig);
		page.save();

		const errorModal = new ErrorModal();
		errorModal.text.waitForDisplayed({ timeout: 60000 });
		expect(errorModal.text.getText()).to.equal('Repository not found');
	});
});

