import React from 'react';
import { withHandlers, compose } from 'recompose';
import electronOpenLinkInBrowser from 'electron-open-link-in-browser';
import { shell } from 'electron';

const GLink = ({ url, onClick, children }) =>
  <button
    style={{ textDecoration: 'underline', cursor: 'pointer' }}
    onClick={() => onClick(url)}
  >
    {children}
  </button>;

const enhance = compose(
  withHandlers({
    onClick: ({ url }) => {
      shell.openExternal(url);
    },
  })
);

export default enhance(GLink);
