export class NewBuildModal {
	get isVisible() {
		return $$('.new-build-modal').length > 0;
	}

	get commitHashInput() {
		return $('.new-build-modal__form .form-field__input');
	}

	get runBuildButton() {
		return $('.new-build-modal__form .button[type="submit"]');
	}


	fill(commitHash) {
		this.commitHashInput.setValue(commitHash);
	}

	runBuild() {
		this.runBuildButton.click();
	}
}
