export interface Build {
    id: string;
    buildNumber: number;
    commitMessage: string;
    commitHash: string;
    branchName: string;
    authorName: string;
    status: string;
    start?: string;
    duration?: number;
}
