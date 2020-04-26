import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
    CLEAR_BUILDS,
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

import { BUILDS_PER_PAGE } from '../constants';

import { Settings } from "../../../config-server/src/models/settings";
import { Build } from "../../../config-server/src/models/build";
import { BuildLog } from "../../../config-server/src/models/build-log";

import { AppState } from "./reducers";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppState,
    unknown,
    Action<string>>;

export type AppDispatch = ThunkDispatch<AppState,
    unknown,
    Action<string>>


async function callApi<T, BeforeActionCreatorType, AfterActionCreatorType>(
    api: () => Promise<T>,
    dispatch: ThunkDispatch<AppState, unknown, Action<BeforeActionCreatorType | AfterActionCreatorType>>,
    beforeActionCreatorType: BeforeActionCreatorType,
    successActionCreatorType: AfterActionCreatorType
): Promise<T> {
    dispatch({ type: beforeActionCreatorType });

    return api()
        .then(data => {
            dispatch({
                type: successActionCreatorType,
                data: data
            });

            return data;
        })
        .catch(err => {
            throw err.response.data;
        });
}


export function initApp(): AppThunk {
    return dispatch => {
        return dispatch(getSettings());
    };
}

export function clearBuilds() {
    return {
        type: CLEAR_BUILDS
    };
}

export function getSettings(): AppThunk<Promise<Settings>> {
    return async dispatch => {
        return await callApi(
            () => api.getSettings(),
            dispatch,
            GET_SETTINGS,
            GET_SETTINGS_SUCCESS
        );
    };
}

export function updateSettings(settings: Settings): AppThunk<Promise<Settings>> {
    return async dispatch => {
        return await callApi(
            () => api.updateSettings(settings),
            dispatch,
            UPDATE_SETTINGS,
            UPDATE_SETTINGS_SUCCESS
        );
    };
}

export function getBuilds(limit = BUILDS_PER_PAGE, offset = 0): AppThunk<Promise<{ builds: Build[], hasMoreBuilds: boolean }>> {
    return async dispatch => {
        return await callApi(
            // Load one more build to understand do we have more
            () => api
                .getBuilds({ limit: limit + 1, offset })
                .then(data => ({
                    builds: data,
                    hasMoreBuilds: data.length === limit + 1
                })),
            dispatch,
            GET_BUILDS,
            GET_BUILDS_SUCCESS
        );
    };
}

export function getBuild(buildId: string): AppThunk<Promise<Build>> {
    return async dispatch => {
        return await callApi(
            () => api.getBuild({ buildId }),
            dispatch,
            GET_BUILD,
            GET_BUILD_SUCCESS
        );
    };
}

export function getBuildLogs(buildId: string): AppThunk<Promise<BuildLog>> {
    return async dispatch => {
        return await callApi(
            () => api.getBuildLogs({ buildId }),
            dispatch,
            GET_BUILD_LOGS,
            GET_BUILD_LOGS_SUCCESS
        );
    };
}

export function requestBuild(commitHash: string): AppThunk<Promise<Build>> {
    return async dispatch => {
        return await callApi(
            () => api.requestBuild({ commitHash }),
            dispatch,
            REQUEST_BUILD,
            REQUEST_BUILD_SUCCESS
        );
    };
}
