/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import { Button, Input } from 'material-ui';
import { Field, getFormSyncErrors, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { connectModal } from '@khanghoang/redux-modal';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import React from 'react';
import blue from 'material-ui/colors/blue';
import { saveRepo } from './reducer';

import PropTypes from 'prop-types';

const styles = {
  avatar: {
    background: blue[100],
    color: blue[600],
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 20,
    padding: '0 10px',
    marginLeft: 15,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
    width: 40,
  },
  progress: {
    color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
};

class SimpleDialog extends React.Component {
  handleRequestClose = () => {
    this.props.onRequestClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onRequestClose(value);
  };

  render() {
    const {
      isError,
      classes,
      onRequestClose,
      selectedValue,
      saveRepo,
      ...other
    } = this.props;

    return (
      <Dialog onRequestClose={this.handleRequestClose} {...other}>
        <DialogTitle>Save repo 1</DialogTitle>
        <div
          style={{
            padding: 30,
            paddingTop: 0,
          }}
        >
          <Field
            name="repoName"
            component={({ input: { value, onChange } }) =>
              <Input
                onChange={onChange}
                value={value}
                placeholder="Repo url"
                error={isError}
                inputProps={{
                  'aria-label': 'Description',
                }}
              />}
          />
          <br />
          <br />
          <Field
            name="tags"
            component={({ input: { value, onChange } }) =>
              <Input
                onChange={onChange}
                value={value}
                placeholder="Enter tags"
                inputProps={{
                  'aria-label': 'Enter tags',
                }}
              />}
          />
          <br />
          <br />
          <Button
            disabled={isError}
            onClick={saveRepo}
            className={classes.button}
          >
            Add
          </Button>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func,
};

const SimpleDialogWrapped = compose(
  withStyles(styles),
  reduxForm({
    form: 'AddRepo',
    validate: (values = {}) => {
      const repoName = values.repoName || '';
      let errors = {};
      if (!repoName.startsWith('https://github.com/')) {
        errors.repoName = 'The link is not github repo link';
      }

      return errors;
    },
  }),
  connect(
    state => ({
      isError: !!(
        getFormSyncErrors('AddRepo')(state) &&
        getFormSyncErrors('AddRepo')(state).repoName
      ),
    }),
    {
      saveRepo,
    }
  )
)(SimpleDialog);

class SimpleDialogDemo extends React.Component {
  render() {
    return (
      <div>
        <br />
        <SimpleDialogWrapped
          open={this.props.isOpen}
          onRequestClose={this.props.closeModal}
        />
      </div>
    );
  }
}

export default compose(connectModal('AddDialog'))(SimpleDialogDemo);
