import { makeFetchAction } from 'redux-api-call';
import { getOr, flow } from 'lodash/fp';

export const {
  dataSelector,
  isFetchingSelector,
  actionCreator,
} = makeFetchAction('FETCH_REPOS', () => {
  return {
    endpoint: 'https://github-tagger.herokuapp.com/getRepo?tag=',
    method: 'GET',
    headers: state => {
      const token = state.session;
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
    },
  };
});

export const reposSelector = flow(dataSelector, getOr([], 'data'));
