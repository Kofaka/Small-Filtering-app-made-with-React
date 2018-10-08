import {GET_SDKS_INFO} from '../actions/actionTypes';

const sdksMiddleware = (store) => next => action => {
    switch (action.type) {
        case GET_SDKS_INFO.SUCCESS:
            action.payload.results.sort((a, b) => (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0);
            next(action);
            break;

        default:
            next(action);
            break;
    }
};

export default sdksMiddleware;