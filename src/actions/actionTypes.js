const asyncActionType = (type) => ({
    PENDING: `${type}_PENDING`,
    SUCCESS: `${type}_SUCCESS`,
    FAILURE: `${type}_FAILURE`,
});

export const API = 'API';
export const GET_SDKS_INFO = asyncActionType('GET_SDKS_INFO');