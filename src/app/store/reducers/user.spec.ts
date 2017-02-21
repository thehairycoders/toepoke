import { UserStatus } from '../../models';
import userReducer from './user';
describe('User reducer', () => {

    it('should return provided state when no valid actions have been made', () => {
        
        const defaultState = {
            users: null,
            user: null,
            status: null
        };

        const actual = userReducer(defaultState, { type: 'UNKNOWN_ACTION' });
        
        expect(actual).toEqual(defaultState);

    });
    

    it('should have a status of get users in progress when receiving GET_USERS_RECEIVED action', () => {
        
        const actual = userReducer(null, { type: 'GET_USERS_RECEIVED' });
        
        expect(actual.status).toEqual(UserStatus.getUsersInProgress);
    });

    it('should have a status of get users success when receiving GET_USERS_SUCCESS action', () => {
        
        const actual = userReducer(null, { type: 'GET_USERS_SUCCESS' });
        
        expect(actual.status).toEqual(UserStatus.getUsersSuccess);
    });

    it('should set users when receiving GET_USER_SUCCESS action', () => {
        
        const users = [
            { '1': 'user1' },
            { '2': 'user2' }
        ];

        const actual = userReducer(null, { type: 'GET_USERS_SUCCESS', payload: users });
        
        expect(actual.users).toEqual(users);

    });

    it('should have a status of get users failure when receiving GET_USERS_FAILURE action', () => {
        
        const actual = userReducer(null, { type: 'GET_USERS_FAILURE' });
        
        expect(actual.status).toEqual(UserStatus.getUsersFailure);
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


    it('should have a status of idle when receiving SET_STATUS_IDLE action', () => {
        
        const actual = userReducer(null, { type: 'SET_STATUS_IDLE' });
        
        expect(actual.status).toEqual(UserStatus.idle);
    });

});