const assert = require('assert');

describe('site', () => {
	it('should have the right title', () => {
		browser.url('/');

		const title = browser.getTitle();
		assert.strictEqual(title, 'School CI Server');
	})
});

