import { setMessages, SEVERITY_ERROR } from './messages';

export const SET_JIRA_URL = 'SET_JIRA_URL';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';

export const INVALIDATE_CONNECTION = 'INVALIDATE_CONNECTION';
export const REQUEST_TEST = 'REQUEST_TEST';
export const RECEIVE_TEST = 'RECEIVE_TEST';
export const FAIL_TEST = 'FAIL_TEST';

export const STATUS_DISCONNECTED = 'Disconnected';
export const STATUS_CONNECTING = 'Connecting';
export const STATUS_CONNECTED = 'Connected';
export const STATUS_FAILED = 'Failed to connect';

export const setJiraUrl = jiraUrl => dispatch => {
  dispatch(invalidateConnection());
  return dispatch({
    type: SET_JIRA_URL,
    jiraUrl
  });
};

export const setUsername = username => dispatch => {
  dispatch(invalidateConnection());
  return dispatch({
    type: SET_USERNAME,
    username
  });
};

export const setPassword = password => dispatch => {
  dispatch(invalidateConnection());
  return dispatch({
    type: SET_PASSWORD,
    password
  });
};

const invalidateConnection = () => {
  return {
    type: INVALIDATE_CONNECTION,
    status: STATUS_DISCONNECTED
  }
}

const requestTest = () => {
  return {
    type: REQUEST_TEST,
    status: STATUS_CONNECTING
  }
}

const receiveTest = () => {
  return {
    type: RECEIVE_TEST,
    status: STATUS_CONNECTED
  }
}

const failTest = messages => dispatch => {
  dispatch(setMessages(messages));
  return dispatch({
    type: FAIL_TEST,
    status: STATUS_FAILED
  });
}

export const testConnection = connection => dispatch => {
  dispatch(requestTest());

  return fetch(`${connection.jiraUrl}/rest/api/2/myself`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${btoa(connection.username + ':' + connection.password)}`
      }
    })
    .then(response => {
      let contentType = (response && response.headers.get('content-type'));
      if(contentType && contentType.indexOf("application/json") === -1) {
        return dispatch(failTest([
          {
            severity: SEVERITY_ERROR,
            text: `Failed to test connection: ${response.status} - ${response.statusText}`
          }
        ]));
      } else {
        return response.json()
        .then(() => dispatch(receiveTest()));
      }
    })
    .catch(e => {
      console.log(e);
      dispatch(setMessages([
        {
          severity: SEVERITY_ERROR,
          text: e.message
        }
      ]))
    })

}
