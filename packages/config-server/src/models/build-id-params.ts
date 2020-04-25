import { ParamsDictionary } from "express-serve-static-core";

export interface BuildIdParams extends ParamsDictionary {
    buildId: string;
}
