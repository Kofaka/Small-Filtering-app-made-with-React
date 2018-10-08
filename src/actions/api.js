import {API, GET_SDKS_INFO} from './actionTypes';

/**
 *
 * @param payload {Object}
 */
export const callAPI = (payload) => ({
    type: API,
    payload
});

export const getSDKsData = () => callAPI({
    url: './sdks.json',
    ...GET_SDKS_INFO,
});
