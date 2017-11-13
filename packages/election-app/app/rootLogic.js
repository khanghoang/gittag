import auth from 'electron-auth';
import { storeGithubToken } from './sessionReducer';
import { actionCreator as fetchRepos } from './containers/reducer';
import { inject, combineLogics } from 'redux-ittt';
import { close } from '@khanghoang/redux-modal';

const closeWhenClickSave = (action, { getState, dispatch }) =>
  action.ofType('@@api/FETCH_START').map(() => {
    const { payload } = action.action;
    const { name } = payload;
    if (name === 'saveRepo') {
      dispatch(close('AddDialog'));
    }
  });

const fetchReposAfterGotToken = (action, { getState, dispatch }) =>
  action.ofType('persist/REHYDRATE').map(() => {
    const token = getState().session;
    if (!token) {
      const opt = {
        // client_id: 'a12166a8942e05cd1c4f',
        // client_secret: '20ba4d0d84fb9725b1d3f7ec324a1f53869fcfb5',
        client_id: 'aa957d0410e4f9cbdb8d',
        client_secret: '880dad95b2bb6481b4f2b18122e7ebebed3a1c96',
      };

      //Handle the github authentication
      auth(
        auth.providers.github,
        { ...opt, scope: 'user:email' },
        async (error, token) => {
          const rawData = await fetch(
            'https://github-tagger.herokuapp.com/login/github',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                token,
              }),
            }
          );
          const receivedToken = await rawData.json();
          dispatch(storeGithubToken(receivedToken.token));
          dispatch(fetchRepos());
          // const repos = await fetch(
          //   'https://github-tagger.herokuapp.com/getRepo?tag=',
          //   {
          //     method: 'GET',
          //     headers: {
          //       'Content-Type': 'application/json',
          //       Authorization: `Bearer ${receivedToken.token}`,
          //     },
          //   }
          // ).then(res => res.json());
        }
      );
    } else {
      dispatch(fetchRepos());
    }
  }); 

export default combineLogics(closeWhenClickSave, fetchReposAfterGotToken);
