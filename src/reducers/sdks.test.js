import expect from 'expect';

import * as getSdksMock from '../../__mocks__/getSdksMock';
import sdks from './sdks';
import {GET_SDKS_INFO} from '../actions/actionTypes';

describe('sdks reducer', () => {
    it('should return the initial state', () => {
        expect(sdks(undefined, {})).toEqual({
            sdksData: [],
            error: null,
        });
    });

    it('should handle GET_SDKS_INFO.PENDING', () => {
        const pendingAction = {
            type: GET_SDKS_INFO.PENDING
        };

        expect(sdks({}, pendingAction)).toEqual({});
    });

    it('should handle GET_SDKS_INFO.SUCCESS', () => {
        const successAction = {
            type: GET_SDKS_INFO.SUCCESS,
            payload: getSdksMock.data
        };

        expect(sdks({}, successAction)).toEqual({
            sdksData: getSdksMock.data.results
        });
    });

    it('should handle GET_SDKS_INFO.FAILURE', () => {
        const errorMessage = "Sorry something went wrong ¯\_(ツ)_/¯";

        const failureAction = {
            type: GET_SDKS_INFO.FAILURE,
            payload: new Error(errorMessage)
        };

        expect(sdks({}, failureAction)).toEqual({
            sdksData: [],
            error: new Error(errorMessage),
        });
    });
});