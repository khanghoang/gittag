import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { ModalPortal } from '@khanghoang/redux-modal';

import auth from 'electron-auth';

import { store } from './createStore';
import ListRepos from './containers/ListTags';
import AppBar from './appBar';
import AddButton from './addButton';
import AddDialog from './addDialog';

// eslint-disable-next-line
export default class App extends Component {
  async componentDidMount() {
  }
  render() {
    return (
      <Provider store={store}>
        <div
          style={{
            userSelect: 'none',
          }}
        >
          <AppBar />
          <ListRepos />
          <ModalPortal wrapComponent="div" />
          <AddButton />
        </div>
      </Provider>
    );
  }
}
