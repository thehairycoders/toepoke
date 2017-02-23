import { UserStatus } from '../../models';
import userReducer from './user';
describe('User reducer', () => {

    it('should return provided state when no valid actions have been made', () => {
        
        const defaultState = {
            user: null,
            status: null
        };

        const actual = userReducer(defaultState, { type: 'UNKNOWN_ACTION' });
        
        expect(actual).toEqual(defaultState);

    });

  it('should have a status of get users in progress when receiving GET_USER_RECEIVED action', () => {
        
        const actual = userReducer(null, { type: 'GET_USER_RECEIVED' });
        
        expect(actual.status).toEqual(UserStatus.getUserInProgress);
    });

    it('should have a status of get users success when receiving GET_USER_SUCCESS action', () => {
        
        const actual = userReducer(null, { type: 'GET_USER_SUCCESS' });
        
        expect(actual.status).toEqual(UserStatus.getUserSuccess);
    });

    it('should set users when receiving GET_USER_SUCCESS action', () => {
        
        const user = { '1': 'user1' };

        const actual = userReducer(null, { type: 'GET_USER_SUCCESS', payload: user });
        
        expect(actual.user).toEqual(user);

    });

    it('should have a status of get users failure when receiving GET_USER_FAILURE action', () => {
        
        const actual = userReducer(null, { type: 'GET_USER_FAILURE' });
        
        expect(actual.status).toEqual(UserStatus.getUserFailure);
    });


    it('should have a status of update in progress received when receiving INITIALISE_USER_RECEIVED action', () => {
        
        const actual = userReducer(null, { type: 'INITIALISE_USER_RECEIVED' });
        
        expect(actual.status).toEqual(UserStatus.updateInProgress);
    });


    it('should have a status of update success when receiving INITIALISE_USER_SUCCESS action', () => {
        
        const actual = userReducer(null, { type: 'INITIALISE_USER_SUCCESS' });
        
        expect(actual.status).toEqual(UserStatus.updateSuccess);
    });


    it('should have a status of update failure when receiving INITIALISE_USER_FAILURE action', () => {
        
        const actual = userReducer(null, { type: 'INITIALISE_USER_FAILURE' });
        
        expect(actual.status).toEqual(UserStatus.updateFailure);
    });


    it('should have a status of idle when receiving SET_USER_STATUS_IDLE action', () => {
        
        const actual = userReducer(null, { type: 'SET_USER_STATUS_IDLE' });
        
        expect(actual.status).toEqual(UserStatus.idle);
    });

});