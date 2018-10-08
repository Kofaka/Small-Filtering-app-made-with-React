import axios from 'axios';
import {API} from '../actions/actionTypes';

const apiMiddleware = ({dispatch}) => next => action => {
    if (action.type !== API) {
        return next(action);
    }

    const {url, PENDING, SUCCESS, FAILURE} = action.payload;

    dispatch({type: PENDING});

    axios.get(url)
        .then(response => {
            dispatch({
                type: SUCCESS,
                payload: response.data,
            })
        })
        .catch(err => {
            dispatch({
                type: FAILURE,
                error: err,
            })
        });

};
export default apiMiddleware;
