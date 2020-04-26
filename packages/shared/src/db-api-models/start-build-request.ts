import { BuildIdRequest } from "./build-id-request";

export interface StartBuildRequest extends BuildIdRequest {
    dateTime?: string;
}
