export class NewBuildModal {
	get commitHashInput() {
		return $('.new-build-modal__form .form-field__input');
	}

	get runBuildButton() {
		return $('.new-build-modal__form .button[type="submit"]');
	}


	fill(commitHash) {
		this.commitHashInput.setValue(commitHash);
	}

	isVisible() {
		return $$('.new-build-modal').length > 0;
	}

	runBuild() {
		this.runBuildButton.click();
	}
}
