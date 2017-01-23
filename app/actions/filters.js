import { setMessages, SEVERITY_ERROR } from './messages';

export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS';
export const FAIL_FILTERS = 'FAIL_FILTERS';

const requestFilters = () => {
  return {
    type: REQUEST_FILTERS
  };
};

const receiveFilters = (filters) => {
  return {
    type: RECEIVE_FILTERS,
    filters
  };
};

const failFilters = messages => dispatch => {
  dispatch(setMessages(messages));
  return dispatch({
    type: FAIL_FILTERS
  })
}

const digestFilters = json => {
  return json.map(f => ({
    id: f.id,
    name: f.name,
    jql: f.jql,
    description: f.description
  }));
};

// ASYNC

export const fetchFilters = (connection) => dispatch => {
  dispatch(requestFilters());
  return fetch(connection.jiraUrl + '/rest/api/2/filter/favourite', {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa(connection.username + ':' + connection.password)
    }
  })
  .then(response => {
    let contentType = (response && response.headers.get('content-type'));
       if(contentType && contentType.indexOf("application/json") === -1) {
         return dispatch(failFilters([{
           severity: SEVERITY_ERROR,
           text: `Failed to load filters: ${response.status} - ${response.statusText}`
         }]));
       } else {
        return response.json()
        .then(json => digestFilters(json))
        .then(filters => dispatch(receiveFilters(filters)));
      }
  })

  .catch(e => {
    console.log(e);
    return dispatch(failFilters([{
      severity: SEVERITY_ERROR,
      text: `Failed to load filters: ${e.message}`
    }]));
  });
};

// SYNC

export const SELECT_FILTER = 'SELECT_FILTER';

export const selectFilter = filterId => {
  return {
    type: SELECT_FILTER,
    filterId
  };
};
