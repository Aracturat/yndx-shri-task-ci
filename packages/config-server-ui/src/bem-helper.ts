import BEMHelper from "react-bem-helper";

export function bemHelper(componentName: string): BEMHelper<string> {
	return new BEMHelper({
		name: componentName,
		outputIsString: true
	});
}
