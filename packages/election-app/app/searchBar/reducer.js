import { createSelector } from 'reselect';
import { handleActions, createAction } from 'redux-actions';
import fuzzy from 'fuzzy';

import { reposSelector } from '../containers/reducer';

const SET_SEARCH_KEY = 'SET_SEARCH_KEY';

export const setKeyword = createAction('SET_SEARCH_KEY');

export const searchKeywordSelector = state => state.keyword;

const options = {
  pre: '<',
  post: '>',
  extract: repo => {
    const tagsStr = repo.tags.reduce((acc, t) => `${acc} ${t.name}`, '');
    return `${repo.name} ${tagsStr}`;
  },
};

export const getSearchedReposSelector = createSelector(
  searchKeywordSelector,
  reposSelector,
  (key, repos) => {
    const results = fuzzy.filter(key, repos, options);
    return results.map(r => r.original);
  }
);

export const reducer = {
  keyword: handleActions(
    {
      [SET_SEARCH_KEY]: (state, { payload }) => payload,
    },
    ''
  ),
};
