import expect from 'expect';

import * as actions from './api';
import {API, GET_SDKS_INFO} from './actionTypes';

describe('actions', () => {
    it('should create an action to get SDKs data', () => {
        const url = './testdata.json';
        const expectedAction = {
            url,
            ...GET_SDKS_INFO
        };
        expect(actions.callAPI(expectedAction)).toEqual({payload: expectedAction, type: API})
    })
});
