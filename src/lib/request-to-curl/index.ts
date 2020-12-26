import { FetchToCurl, FetchOptions } from './types';

export * from './types';

/**
 * see https://fetch.spec.whatwg.org/#methods
 *
 * @export
 * @param {any} options
 * @returns {string}
 */
export const generateMethod = (options: FetchOptions): string => {
    const method = options.method;
    if (!method) return '';
    const type = {
        GET: ' -X GET',
        POST: ' -X POST',
        PUT: ' -X PUT',
        PATCH: ' -X PATCH',
        DELETE: ' -X DELETE',
        HEAD: ' -X HEAD',
        OPTIONS: ' -X OPTIONS',
    };
    return type[method.toUpperCase()] || '';
};

/**
 * @typedef {Object} HeaderParams
 * @property {Boolean} isEncode - A flag which is set to true if the request should set the --compressed flag
 * @property {String} params - The header params as string
 */

const getHeaderString = (name, val) =>
    ` -H "${name}: ${val.replace(/(\\|")/g, '\\$1')}"`;

/**
 * @export
 * @param {object={}} options
 * @param {object|Headers} options.headers
 * @returns {HeaderParams} An Object with the header info
 */
export const generateHeader = (
    options: FetchOptions = {},
): {
    params: string;
    isEncode: boolean;
} => {
    const { headers } = options;
    let isEncode = false;
    let headerParam = '';
    Object.keys(headers).map(name => {
        if (name.toLocaleLowerCase() !== 'content-length') {
            headerParam += getHeaderString(name, headers[name]);
        }
        if (name.toLocaleLowerCase() === 'accept-encoding') {
            isEncode = true;
        }
    });
    return {
        params: headerParam,
        isEncode,
    };
};

/**
 *
 *
 * @export
 * @param {Object} body
 * @returns {string}
 */
export function generateBody(body: { [p: string]: string }): string {
    if (!body) return '';
    return ` --data-binary '${JSON.stringify(body)}'`;
}

/**
 *
 *
 * @export
 * @param {boolean} isEncode
 * @return {string}
 */
export function generateCompress(isEncode: boolean): string {
    return isEncode ? ' --compressed' : '';
}

export const fetchToCurl: FetchToCurl = (requestInfo, requestInit) => {
    let url, options;
    /**
     * initialization with an empty object is done here to
     * keep everything backwards compatible to 0.4.0 and below
     */
    if (typeof requestInfo === 'string') {
        url = requestInfo;
        options = requestInit || {};
    } else {
        url = (requestInfo || {}).url;
        options = requestInfo || {};
    }
    const { body } = options;
    const headers = generateHeader(options);
    return `curl "${url}"${generateMethod(options)}${headers.params ||
        ''}${generateBody(body)}${generateCompress(headers.isEncode)}`;
};
