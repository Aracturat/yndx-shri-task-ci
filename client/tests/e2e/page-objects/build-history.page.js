import { NewBuildModal } from './new-build.modal';

export class BuildHistoryPage {
	get runBuildButton() {
		return $('.build-history-page__run-build-button');
	}

	open() {
		browser.url('/build-history');
		browser.waitUntil(() => $$('.build-history-page__list').length > 0);
	}

	openRunBuildModal() {
		this.runBuildButton.click();

		const modal = new NewBuildModal();
		browser.waitUntil(() => modal.isVisible());

		return modal;
	}
}
