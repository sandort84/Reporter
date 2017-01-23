import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { hashHistory } from 'react-router';

import * as actionCreators from '../actions';
import Messages from './Messages.jsx';
import Footer from './Footer.jsx';

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
    active: PropTypes.string,
    status: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ipcRenderer.on('browser-navigate', (event, loc) => {
      hashHistory.push(loc);
    });

    const { testConnection, connection } = this.props;
    if (connection.jiraUrl && connection.username && connection.password) {
      testConnection(connection);
    }
  }

  render() {
    return (
      <div>
        <Messages {...this.props} />
        {React.cloneElement(this.props.children, this.props)}
        <Footer {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  connection: state.connection,
  filters: state.filters,
  selectedFilter: state.selectedFilter,
  issues: state.issues,
  active: state.active,
  messages: state.messages,
  status: state.status
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
