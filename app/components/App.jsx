import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { hashHistory } from 'react-router';

import * as actionCreators from '../actions';

class App extends Component {
  static propTypes = {
    connection: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      jiraUrl: PropTypes.string.isRequired
    }).isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      jql: PropTypes.string.isRequired,
      description: PropTypes.string
    })).isRequired,
    selectedFilter: PropTypes.string.isRequired,
    issues: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      summary: PropTypes.string
    })).isRequired,
    active: PropTypes.string
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const connection = ipcRenderer.sendSync('get-connection-details');
    const { setJiraUrl, setUsername, setPassword } = this.props;
    const dispatch = this.props.route.dispatch;
    dispatch(setJiraUrl(connection.jiraUrl));
    dispatch(setUsername(connection.username));
    dispatch(setPassword(connection.password));
    ipcRenderer.on('browser-navigate', (event, loc) => {
      hashHistory.push(loc);
    })
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  connection: state.connection,
  filters: state.filters,
  selectedFilter: state.selectedFilter,
  issues: state.issues,
  active: state.active
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
