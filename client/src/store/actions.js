import {
	GET_BUILD,
	GET_BUILD_LOGS,
	GET_BUILD_LOGS_SUCCESS,
	GET_BUILD_SUCCESS,
	GET_BUILDS,
	GET_BUILDS_SUCCESS,
	GET_SETTINGS,
	GET_SETTINGS_SUCCESS,
	REQUEST_BUILD,
	REQUEST_BUILD_SUCCESS,
	UPDATE_SETTINGS,
	UPDATE_SETTINGS_SUCCESS
} from './actions-types';

import * as api from './api';

async function callApi(api, dispatch, beforeActionCreator, successActionCreator) {
	dispatch(beforeActionCreator());

	return await api()
		.then(data => {
			dispatch(successActionCreator(data));

			return data;
		});
}

function action(type) {
	return (data) => ({
		type,
		data
	});
}

export function initApp() {
	return dispatch => {
		return dispatch(getSettings());
	}
}

export function getSettings() {
	return async dispatch => {
		return await callApi(
			() => api.getSettings(),
			dispatch,
			action(GET_SETTINGS),
			action(GET_SETTINGS_SUCCESS)
		);
	}
}

export function updateSettings(settings) {
	return async dispatch => {
		return await callApi(
			() => api.updateSettings(settings),
			dispatch,
			action(UPDATE_SETTINGS),
			action(UPDATE_SETTINGS_SUCCESS)
		);
	}
}

export function getBuilds(limit, offset) {
	return async dispatch => {
		return await callApi(
			() => api.getBuilds({ limit, offset }),
			dispatch,
			action(GET_BUILDS),
			action(GET_BUILDS_SUCCESS)
		);
	}
}

export function getBuild(buildId) {
	return async dispatch => {
		return await callApi(
			() => api.getBuild({ buildId }),
			dispatch,
			action(GET_BUILD),
			action(GET_BUILD_SUCCESS)
		);
	}
}

export function getBuildLogs(buildId) {
	return async dispatch => {
		return await callApi(
			() => api.getBuildLogs({ buildId }),
			dispatch,
			action(GET_BUILD_LOGS),
			action(GET_BUILD_LOGS_SUCCESS)
		);
	}
}

export function requestBuild(commitHash) {
	return async dispatch => {
		return await callApi(
			() => api.requestBuild({ commitHash }),
			dispatch,
			action(REQUEST_BUILD),
			action(REQUEST_BUILD_SUCCESS)
		);
	}
}
