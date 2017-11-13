// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import { open } from '@khanghoang/redux-modal';
import { compose } from 'recompose';
import { connect } from 'react-redux';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    right: 10,
    bottom: 10,
    zIndex: 10,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    color: 'white',
    padding: '0 10px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
});

function FloatingActionButtons(props) {
  const { classes, open } = props;
  return (
    <div>
      <Button
        onClick={open}
        fab
        color="primary"
        aria-label="add"
        className={classes.button}
      >
        <AddIcon />
      </Button>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(null, dispatch => ({
    open: () => {
      dispatch(open('AddDialog'));
    },
  }))
)(FloatingActionButtons);
