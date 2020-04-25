import { BuildIdRequest } from "./build-id-request";

export interface FinishBuildRequest extends BuildIdRequest {
    duration: number;
    success: boolean;
    buildLog: string;
}
