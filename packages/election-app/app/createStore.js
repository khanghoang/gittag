import { middleware as apiMiddleware } from 'redux-api-call';
import { makeLogicMiddleware } from 'redux-ittt';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import rootLogic from './rootLogic';
import rootReducer from './rootReducer';

const logicMiddleware = makeLogicMiddleware(rootLogic);

export const createReduxStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    {},
    composeEnhancers(
      applyMiddleware(thunkMiddleware, apiMiddleware, logicMiddleware),
      autoRehydrate()
    )
  );
};

export const store = createReduxStore();

// begin periodically persisting the store
persistStore(store, { whitelist: ['session'] });
