import { NewBuildModal } from './new-build.modal';

export class BuildHistoryPage {
	get isVisible() {
		return $$('.build-history-page').length > 0;
	}

	get runBuildButton() {
		return $('.build-history-page__run-build-button');
	}

	open() {
		browser.url('/build-history');
		browser.waitUntil(() => this.isVisible);
	}

	openRunBuildModal() {
		this.runBuildButton.click();

		const modal = new NewBuildModal();
		browser.waitUntil(() => modal.isVisible);

		return modal;
	}
}
