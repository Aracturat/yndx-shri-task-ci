export class SettingsPage {
	get isVisible() {
		return $$('.settings-page').length > 0;
	}

	get repo() {
		return $$('.form-field')[0].$('.form-field__input');
	}

	get buildCommand() {
		return $$('.form-field')[1].$('.form-field__input');
	}

	get mainBranch() {
		return $$('.form-field')[2].$('.form-field__input');
	}

	get period() {
		return $$('.form-field')[3].$('.form-field__input');
	}

	get saveButton() {
		return $('.settings-page__buttons .button[type="submit"]');
	}

	fill({ repo, buildCommand, mainBranch, period }) {
		this.repo.setValue(repo);
		this.buildCommand.setValue(buildCommand);
		this.mainBranch.setValue(mainBranch);
		this.period.setValue(period);
	}

	open() {
		browser.url('/settings');
		browser.waitUntil(() => this.isVisible);
	}

	save() {
		this.saveButton.click();
	}
}
