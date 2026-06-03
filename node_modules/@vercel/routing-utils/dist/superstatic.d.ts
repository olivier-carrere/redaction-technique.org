import { Route, Redirect, Rewrite, HasField, Header } from './types';
import { Key } from 'path-to-regexp';
export declare function pathToRegexp(callerId: string, path: string, keys?: Key[], options?: {
    strict: boolean;
    sensitive: boolean;
    delimiter: string;
}): RegExp;
export declare function getCleanUrls(filePaths: string[]): {
    html: string;
    clean: string;
}[];
export declare function convertCleanUrls(cleanUrls: boolean, trailingSlash?: boolean, status?: number): Route[];
export declare function convertRedirects(redirects: Redirect[], defaultStatus?: number): Route[];
export declare function convertRewrites(rewrites: Rewrite[], internalParamNames?: string[]): Route[];
export declare function convertHeaders(headers: Header[]): Route[];
export declare function convertTrailingSlash(enable: boolean, status?: number): Route[];
export declare function sourceToRegex(source: string): {
    src: string;
    segments: string[];
};
export declare function collectHasSegments(has?: HasField): string[];
