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
