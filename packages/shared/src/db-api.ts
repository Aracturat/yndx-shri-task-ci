import https from 'https';
import axios from 'axios';

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

export interface BuildConfiguration {
    repoName: string;
    buildCommand: string;
    mainBranch: string;
    period: number;
}

/**
 * Get build configuration.
 */
export function getBuildConfiguration(): Promise<BuildConfiguration> {
    return instance
        .get<BuildConfiguration>('/conf')
        .then(result => result.data);
}

/**
 * Set build configuration.
 */
export function setBuildConfiguration({ repoName, buildCommand, mainBranch, period }: BuildConfiguration) {
    return instance.post<BuildConfiguration>('/conf', {
        repoName,
        buildCommand,
        mainBranch,
        period
    });
}

/**
 * Delete build configuration.
 */
export function deleteBuildConfiguration() {
    return instance.delete('/conf');
}

export interface BuildRequest {
    commitMessage: string;
    commitHash: string;
    branchName: string;
    authorName: string;
}

/**
 * Request build.
 */
export function requestBuild({ commitMessage, commitHash, branchName, authorName }: BuildRequest) {
    return instance.post<BuildRequest>('/build/request', {
        commitMessage,
        commitHash,
        branchName,
        authorName
    });
}

/**
 * Start build.
 */
export function startBuild({ buildId, dateTime }: { buildId: string, dateTime: Date }) {
    if (!buildId) {
        throw 'buildId parameter is missing';
    }
    if (!dateTime) {
        dateTime = new Date();
    }

    return instance.post('/build/start', {
        buildId,
        dateTime: dateTime.toISOString(),
    });
}

export interface FinishBuildRequest {
    buildId: string;
    duration: number;
    success: boolean;
    buildLog: string;
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
export function cancelBuild({ buildId }: { buildId: string}) {
    return instance.post('/build/finish', {
        buildId
    });
}

export interface GetBuildListRequest {
    limit: number;
    offset: number;
}

export interface Build {
    id: string;
    buildNumber: number;
    commitMessage: string;
    commitHash: string;
    branchName: string;
    authorName: string;
    status: string;
    start: Date;
    duration: number;
}

/**
 * Get list of all builds.
 */
export function getBuildList({ limit = 25, offset = 0 }: GetBuildListRequest) {
    return instance
        .get<{ data: Build[] }>('/build/list', {
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
export function getBuildDetails({ buildId }: { buildId: string }) {
    return instance
        .get('/build/details', {
            params: {
                buildId
            }
        })
        .then(result => result.data);
}

/**
 * Get build log.
 */
export function getBuildLog({ buildId }: { buildId: string }) {
    return instance
        .get('/build/log', {
            params: {
                buildId
            }
        })
        .then(result => result.data);
}
