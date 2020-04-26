import {
    CLEAR_BUILDS,
    GET_BUILD_LOGS_SUCCESS,
    GET_BUILD_SUCCESS,
    GET_BUILDS_SUCCESS,
    GET_SETTINGS_SUCCESS,
    INIT_APP,
    REQUEST_BUILD_SUCCESS,
    UPDATE_SETTINGS_SUCCESS
} from './actions-types';
import { BUILDS_PER_PAGE } from '../constants';
import { Settings } from "../../../config-server/src/models/settings";
import { Build } from "../../../config-server/src/models/build";
import { BuildLog } from "../../../config-server/src/models/build-log";

export interface AppState {
    isLoaded: boolean;
    settings: Settings | null;
    builds: Build[];
    buildLogs: BuildLog[];
    hasMoreBuilds: boolean;
}


export const defaultState: AppState = {
    isLoaded: false,
    settings: null,
    builds: [],
    hasMoreBuilds: false,
    buildLogs: [],
};




export function reducer(state = defaultState, action: any) {
    switch (action.type) {
        case INIT_APP:
            return defaultState;
        case CLEAR_BUILDS:
            return {
                ...state,
                builds: [],
                hasMoreBuilds: false,
                buildLogs: []
            };
        case UPDATE_SETTINGS_SUCCESS:
        case GET_SETTINGS_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                settings: action.data
            };
        case GET_BUILD_LOGS_SUCCESS:
            const buildLogs = state.buildLogs.filter(buildLog => buildLog.id !== action.data.id);

            return {
                ...state,
                buildLogs: [...buildLogs, action.data]
            };
        case REQUEST_BUILD_SUCCESS:
        case GET_BUILD_SUCCESS:
            const builds = state.builds.filter(build => build.id !== action.data.id);

            return {
                ...state,
                builds: [action.data, ...builds]
            };
        case GET_BUILDS_SUCCESS:
            return {
                ...state,
                builds: [
                    ...state.builds,
                    ...action.data.builds.slice(0, Math.max(action.data.builds.length - 1, BUILDS_PER_PAGE))
                ],
                hasMoreBuilds: action.data.hasMoreBuilds
            };
        default:
            return state;
    }
}
