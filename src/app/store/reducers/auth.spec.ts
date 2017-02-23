import { RegisterStatus } from '../../models/register-status';
import { LoginStatus } from '../../models';
import authReducer from './auth';
describe('Auth reducer', () => {

    it('should return provided state when no valid actions have been made', () => {
        
        const defaultState = {
            loginStatus: LoginStatus.unknown,
            registerStatus: RegisterStatus.unknown,
            authState: null,
        };

        const actual = authReducer(defaultState, { type: 'UNKNOWN_ACTION', payload: {} });

        expect(actual).toEqual(defaultState);
    });

    it('should have a status of logging in when receiving LOGIN_RECEIVED action', () => {
        
        const actual = authReducer(null, { type: 'LOGIN_RECEIVED' });
        
        expect(actual.loginStatus).toEqual(LoginStatus.loggingIn);
    });

    it('should have a status of login failed when receiving LOGIN_FAILURE action', () => {
        
        const actual = authReducer(null, { type: 'LOGIN_FAILURE' });
        
        expect(actual.loginStatus).toEqual(LoginStatus.loginFailed);
    });

    it('should have a status of logged in when receiving USER_AUTHENTICATED action', () => {
        
        const actual = authReducer(null, { type: 'USER_AUTHENTICATED' });
        
        expect(actual.loginStatus).toEqual(LoginStatus.loggedIn);
    });

    it('should set the authState when receiving USER_AUTHENTICATED action', () => {
        
        const authState = {
            seetAuthState: true
        };

        const actual = authReducer(null, { type: 'USER_AUTHENTICATED', payload: authState });
        
        expect(actual.authState).toEqual(authState);
    });

    it('should have a status of logged out when receiving USER_NOT_AUTHENTICATED action', () => {
        
        const actual = authReducer(null, { type: 'USER_NOT_AUTHENTICATED' });
        
        expect(actual.loginStatus).toEqual(LoginStatus.loggedOut);
    });

    it('should have null authState when receiving USER_NOT_AUTHENTICATED action', () => {
        
        const actual = authReducer(null, { type: 'USER_NOT_AUTHENTICATED' });
        
        expect(actual.authState).toBeNull();
    });

    it('should have a status of logging out when receiving LOGOUT_RECEIVED action', () => {
        
        const actual = authReducer(null, { type: 'LOGOUT_RECEIVED' });
        
        expect(actual.loginStatus).toEqual(LoginStatus.loggingOut);
    });

    it('should have a status of registering when receiving REGISTER_RECEIVED action', () => {
        
        const actual = authReducer(null, { type: 'REGISTER_RECEIVED' });
        
        expect(actual.loginStatus).toEqual(LoginStatus.registering);
    });

    it('should have a status of register failed when receiving REGISTER_FAILURE action', () => {
        
        const actual = authReducer(null, { type: 'REGISTER_FAILURE' });
        
        expect(actual.loginStatus).toEqual(LoginStatus.registerFailed);
    });


});