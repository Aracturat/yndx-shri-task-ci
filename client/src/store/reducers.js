import {
	GET_BUILD,
	GET_BUILD_LOGS,
	GET_BUILD_LOGS_SUCCESS,
	GET_BUILD_SUCCESS,
	GET_BUILDS,
	GET_BUILDS_SUCCESS,
	GET_SETTINGS,
	GET_SETTINGS_SUCCESS, INIT_APP,
	REQUEST_BUILD,
	REQUEST_BUILD_SUCCESS,
	UPDATE_SETTINGS,
	UPDATE_SETTINGS_SUCCESS
} from './actions-types';


export const defaultState = {
	isLoaded: false,
	settings: {},
	builds: []
};


export function reducer(state = defaultState, action) {
	switch (action.type) {
		case INIT_APP:
			return defaultState;
		case GET_SETTINGS:
		case UPDATE_SETTINGS:
			return state;
		case UPDATE_SETTINGS_SUCCESS:
		case GET_SETTINGS_SUCCESS:
			return {
				...state,
				isLoaded: true,
				settings: action.data
			};
		case GET_BUILD:
			return state;
		case GET_BUILD_LOGS:
			return state;
		case GET_BUILD_LOGS_SUCCESS:
			return state;
		case GET_BUILD_SUCCESS:
			return state;
		case GET_BUILDS:
			return state;
		case GET_BUILDS_SUCCESS:
			return state;
		case REQUEST_BUILD:
			return state;
		case REQUEST_BUILD_SUCCESS:
			return state;
		default:
			return state;
	}
}
