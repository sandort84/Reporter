import React, { Component, PropTypes } from 'react';
import { selectFilter, fetchFilters, fetchIssues, toggleIssue } from '../actions';
import { shell } from 'electron';
import deepEqual from 'deep-equal';

import IssueSource from './IssueSource.jsx';
import IssueList from './IssueList.jsx';

class Reporter extends Component {

  constructor(props) {
    super(props);
  }

  handleFilterSelect = evt => {
    const filterId = evt.target.value;
    const { connection, filters, selectFilter, fetchIssues} = this.props;
    selectFilter(filterId);
    fetchIssues(connection, filters.filter(f => (f.id == filterId))[0].jql);
  }

  handleIssueClick = (evt, key) => {
    evt.preventDefault();
    if (this.issueClickTimer) {
      window.clearTimeout(this.issueClickTimer);
      this.issueClickTimer = undefined;
      return;
    }
    this.issueClickTimer = window.setTimeout(() => {
      shell.openExternal(`${this.props.connection.jiraUrl}/browse/${key}`);
    }, 1000);
  }

  handleIssueDoubleClick = (evt, issueId) => {
    evt.preventDefault();
    this.props.toggleIssue(issueId);
  }

  componentDidMount() {
    const { fetchFilters, connection } = this.props;
    if (connection.jiraUrl && connection.username && connection.password) {
      fetchFilters(connection);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!deepEqual(this.props.connection, newProps.connection)) {
      const { fetchFilters, connection } = newProps;
      if (connection.jiraUrl && connection.username && connection.password) {
        fetchFilters(connection);
      }
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <IssueSource handleFilterSelect={this.handleFilterSelect} {...this.props}/>
        <IssueList handleIssueClick={this.handleIssueClick} handleIssueDoubleClick={this.handleIssueDoubleClick} {...this.props}/>
      </div>
    );
  }
}

export default Reporter;
