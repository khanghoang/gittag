// @flow weak

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input/Input';
import React from 'react';
import { setKeyword, getSearchedReposSelector } from './reducer';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
    color: '#ddd',
  },
});

const SearchInput = props => {
  const { classes, onChange } = props;
  return (
    <div className={classes.container}>
      <Input
        className={classes.input}
        onChange={onChange}
        placeholder="Type to search"
        inputProps={{
          'aria-label': 'Description',
        }}
      />
    </div>
  );
};

const enhance = compose(
  connect(
    state => ({
      repos: getSearchedReposSelector(state),
    }),
    dispatch => ({
      onChange: (e) => {
        dispatch(setKeyword(e.target.value));
      },
    })
));

export default compose(withStyles(styles), enhance)(SearchInput);
