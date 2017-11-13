/* eslint-disable */
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import React from 'react';

import {
  getSearchedReposSelector,
  searchKeywordSelector,
} from '../searchBar/reducer';
import { reposSelector } from './reducer';
import List from '../components/List';

const ListRepos = ({ repos = [], searchRepos = [], keyword }) => {
  return (
    <div style={{
      paddingTop: 70,
    }}>
      {keyword.length > 0
        ? <List repos={searchRepos} />
        : <List repos={repos} />}
    </div>
  );
};

export default compose(
  connect(
    state => ({
      repos: reposSelector(state),
      searchRepos: getSearchedReposSelector(state),
      keyword: searchKeywordSelector(state),
    }),
    null
  ),
  withState('searchResults', 'setSearchResults', [])
)(ListRepos);
