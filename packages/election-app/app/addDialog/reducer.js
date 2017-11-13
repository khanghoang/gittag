import { makeFetchAction } from 'redux-api-call';
import { formValueSelector } from 'redux-form';

export const {
  actionCreator: saveRepo,
  isFetching: saveRepoIsLoadingSelector,
  errorSelector: saveRepoErrorSelector,
} = makeFetchAction('saveRepo', () => {
  return {
    endpoint: 'https://github-tagger.herokuapp.com/save',
    method: 'POST',
    body: state => {
      const formSelector = formValueSelector('AddRepo');
      return JSON.stringify({
        name: formSelector(state, 'repoName'),
        tags: formSelector(state, 'tags'),
      });
    },
    headers: state => {
      const token = state.session;
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
    },
  };
});
