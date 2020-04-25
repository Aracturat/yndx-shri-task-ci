import https from 'https';
import axios from 'axios';

import { BuildConfiguration } from "./db-api-models/build-configuration";
import { BuildRequest } from "./db-api-models/build-request";
import { StartBuildRequest } from "./db-api-models/start-build-request";
import { FinishBuildRequest } from "./db-api-models/finish-build-request";
import { GetBuildListRequest } from "./db-api-models/get-build-list-request";
import { Build } from "./db-api-models/build";
import { DataResponse } from "./db-api-models/data-response";
import { BuildIdRequest } from "./db-api-models/build-id-request";

console.log(`Creation of connection to DB: ${ process.env.API_BASE_URL }`);

const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${ process.env.API_TOKEN }`,
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
});


/**
 * Get build configuration.
 */
export function getBuildConfiguration() {
    return instance
        .get<DataResponse<BuildConfiguration>>('/conf')
        .then(result => result.data);
}

/**
 * Set build configuration.
 */
export function setBuildConfiguration(configuration: BuildConfiguration) {
    return instance.post('/conf', configuration);
}

/**
 * Delete build configuration.
 */
export function deleteBuildConfiguration() {
    return instance.delete('/conf');
}


/**
 * Request build.
 */
export function requestBuild(buildRequest: BuildRequest) {
    return instance.post('/build/request', buildRequest);
}

/**
 * Start build.
 */
export function startBuild(request: StartBuildRequest) {
    if (!request.buildId) {
        throw 'buildId parameter is missing';
    }
    if (!request.dateTime) {
        request.dateTime = new Date().toISOString();
    }

    return instance.post('/build/start', request);
}


/**
 * Finish build.
 */
export function finishBuild(request: FinishBuildRequest) {
    return instance.post('/build/finish', request);
}

/**
 * Cancel build.
 */
export function cancelBuild(request: BuildIdRequest) {
    return instance.post('/build/finish', request);
}



/**
 * Get list of all builds.
 */
export function getBuildList({ limit = 25, offset = 0 }: GetBuildListRequest) {
    return instance
        .get<DataResponse<Build[]>>('/build/list', {
            params: {
                limit,
                offset
            }
        })
        .then(result => result.data);
}

/**
 * Get build details.
 */
export function getBuildDetails(request: BuildIdRequest) {
    return instance
        .get<DataResponse<Build>>('/build/details', {
            params: request
        })
        .then(result => result.data);
}

/**
 * Get build log.
 */
export function getBuildLog(request: BuildIdRequest) {
    return instance
        .get<string>('/build/log', {
            params: request
        })
        .then(result => result.data);
}
