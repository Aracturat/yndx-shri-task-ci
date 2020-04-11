class SettingsPage {
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
		browser.debug();
		this.buildCommand.setValue(buildCommand);
		browser.debug();
		this.mainBranch.setValue(mainBranch);
		browser.debug();
		this.period.setValue(period);
		browser.debug();
	}

	open() {
		browser.url('/settings');
		browser.waitUntil(() => $$('.settings-page__form').length > 0);
		browser.debug();
	}

	save() {
		this.saveButton.click();
	}
}

module.exports = { SettingsPage };
