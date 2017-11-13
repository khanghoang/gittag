import { configureStore } from 'redux-mock-store';
import rootLogic from './rootLogic';

const middleware = createLogicMiddleware(rootLogic);

const mockStore = configureStore([middleware]);

describe('description', function() {
  it('dispatches save token after getting token', function() {
    const store = mockStore({});
    store.dispatch({ type: 'persist/REHYDRATE' });
    // expect(store.getActions()).isEqual(expect.arrayContainning([{
     // STORE_GITHUB_TOKEN
    // }]))
  });
  
});

