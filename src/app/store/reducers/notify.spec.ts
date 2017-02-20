import { LoginStatus } from '../../models';
import notifyReducer from './notify';
describe('Notify reducer', () => {

    it('should return provided state when no valid actions have been made', () => {
        
        const defaultState = {
            message: null
        };

        const actual = notifyReducer(defaultState, { type: 'UNKNOWN_ACTION' });
        
        expect(actual).toEqual(defaultState);

    });

    it('should set a message when receiving SHOW_MESSAGE action', () => {
        
        const message = 'message';

        const actual = notifyReducer(null, { type: 'SHOW_MESSAGE', payload: message });
        
        expect(actual.message).toEqual(message);

    });

    it('should have a null message when receiving REMOVE_MESSAGE action', () => {
        
        const actual = notifyReducer(null, { type: 'REMOVE_MESSAGE' });
        
        expect(actual.message).toBeNull();

    });

});