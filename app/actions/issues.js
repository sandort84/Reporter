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

export const TOGGLE_ISSUE = 'TOGGLE_ISSUE';

export const toggleIssue = issueId => {
  return {
    type: TOGGLE_ISSUE,
    issueId
  };
};
