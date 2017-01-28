import { addEntry } from './worklog';

export const REQUEST_ISSUES = 'REQUEST_ISSUES';
export const RECEIVE_ISSUES = 'RECEIVE_ISSUES';
// TODO: export const FAIL_ISSUES = 'FAIL_ISSUES';

const requestIssues = () => {
  return {
    type: REQUEST_ISSUES
  };
};

const receiveIssues = (issues) => {
  return {
    type: RECEIVE_ISSUES,
    issues
  };
};

const digestIssues = json => {
  return json.issues.map(i => ({
    id: i.id,
    url: i.self,
    key: i.key,
    summary: i.fields ? i.fields.summary : undefined
  }));
};

// ASYNC

export const fetchIssues = (connection, jql) => dispatch => {
  dispatch(requestIssues());
  return fetch(connection.jiraUrl + `/rest/api/2/search?jql=${jql}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa(connection.username + ':' + connection.password)
    }
  })
  .then(response => response.json())
  .then(json => digestIssues(json))
  .then(issues => dispatch(receiveIssues(issues)))
  .catch(e => console.log(e));
};

// SYNC

export const START_ISSUE = 'START_ISSUE';
export const END_ISSUE = 'END_ISSUE';

const startIssue = (issueId, time) => {
  return {
    type: START_ISSUE,
    issueId,
    time
  }
};

const endIssue = (active, time) => dispatch => {
  dispatch(addEntry({
    ...active,
    end: time
  }));
  return dispatch({
    type: END_ISSUE
  })
};

export const toggleIssue = issueId => (dispatch, getState) => {
  const { active } = getState();
  const time = new Date().getTime();
  if (active.id === issueId) {
    return dispatch(endIssue(issueId, time));
  }
  if (!active.id) {
    return dispatch(startIssue(issueId, time));
  }
  dispatch(endIssue(active, time));
  return dispatch(startIssue(issueId, time));
};
