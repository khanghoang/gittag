import { createAction, handleActions } from 'redux-actions';

const STORE_GITHUB_TOKEN = 'STORE_GITHUB_TOKEN';

export const storeGithubToken = createAction(STORE_GITHUB_TOKEN);
export const sessionReducer = handleActions({
  STORE_GITHUB_TOKEN: (state, { payload }) => payload,
}, null);

export const reducer = {
 session: sessionReducer,
};
