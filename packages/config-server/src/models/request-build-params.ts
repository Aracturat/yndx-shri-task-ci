import { ParamsDictionary } from "express-serve-static-core";

export interface RequestBuildParams extends ParamsDictionary {
    commitHash: string;
}
