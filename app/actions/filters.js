export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS';
// TODO: export const FAIL_FILTERS = 'FAIL_FILTERS';

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
  .then(response => response.json())
  .then(json => digestFilters(json))
  .then(filters => dispatch(receiveFilters(filters)))
  .catch(e => console.log(e));
};

// SYNC

export const SELECT_FILTER = 'SELECT_FILTER';

export const selectFilter = filterId => {
  return {
    type: SELECT_FILTER,
    filterId
  };
};
