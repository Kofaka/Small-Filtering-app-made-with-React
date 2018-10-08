import {GET_SDKS_INFO} from '../actions/actionTypes';

const initialState = {
    sdksData: [],
    error: null,
};

function sdks(state = initialState, action) {
    switch (action.type) {
        case GET_SDKS_INFO.PENDING:
            return {
                ...state,
            };

        case GET_SDKS_INFO.SUCCESS:
            return {
                ...state,
                sdksData: action.payload.results,
            };

        case GET_SDKS_INFO.FAILURE:
            return {
                ...state,
                sdksData: [],
                error: action.payload,
            };

        default:
            return state;
    }

}

export default sdks;
