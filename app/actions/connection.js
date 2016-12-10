export const SET_JIRA_URL = 'SET_JIRA_URL';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';

export const setJiraUrl = jiraUrl => {
  return {
    type: SET_JIRA_URL,
    jiraUrl
  };
};

export const setUsername = username => {
  return {
    type: SET_USERNAME,
    username
  };
};

export const setPassword = password => {
  return {
    type: SET_PASSWORD,
    password
  };
};
