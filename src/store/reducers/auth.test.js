import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

configure({ adapter: new Adapter() });

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        })
    })

    it('should store token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'token',
            userId: 'userid'
        })).toEqual({
            token: 'token',
            userId: 'userid',
            error: null,
            loading: false,
            authRedirectPath: '/',
        })
    })
})