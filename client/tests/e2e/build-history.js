import { expect } from 'chai';

import { BuildHistoryPage } from './page-objects/build-history.page';
import { ErrorModal } from './page-objects/error.modal';

import { updateSettings } from '../../src/store/api';

describe('Страница с историей билдов', () => {
	const page = new BuildHistoryPage();

	const correctSettings = {
		repoName: 'Aracturat/yndx-shri-task-ci',
		buildCommand: 'npm ci',
		mainBranch: 'master',
		period: 100
	};

	before(async () => {
		await updateSettings(correctSettings);
	});

	beforeEach(() => {
		page.open();
	});

	it('должна позволять запустить новый билд', () => {
		const modal = page.openRunBuildModal();

		modal.fill('63f157f');
		modal.runBuild();

		browser.waitUntil(() => $$('.build-details-page').length > 0);
		expect(browser.getUrl().includes('/build/')).to.equal(true);
	}, 2);

	it('должна показывать ошибку, если ввели неверный номер коммита для нового билда', () => {
		const modal = page.openRunBuildModal();

		modal.fill('123123');
		modal.runBuild();

		const errorModal = new ErrorModal();
		errorModal.text.waitForDisplayed({ timeout: 60000 });
		expect(errorModal.text.getText()).to.equal('Git error: Unknown revision');
	});
});

