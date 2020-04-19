const BEMHelper = require('react-bem-helper');

export function bemHelper(componentName) {
	return new BEMHelper({
		name: componentName,
		outputIsString: true
	});
}
