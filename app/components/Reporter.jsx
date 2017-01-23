import React, { Component, PropTypes } from 'react';
import { selectFilter, fetchFilters, fetchIssues, toggleIssue } from '../actions';
import { shell } from 'electron';
import deepEqual from 'deep-equal';

class Reporter extends Component {

  constructor(props) {
    super(props);
  }

  handleFilterSelect(filterId) {
    const { connection, filters, selectFilter, fetchIssues} = this.props;
    selectFilter(filterId);
    fetchIssues(connection, filters.filter(f => (f.id == filterId))[0].jql);
  }

  handleIssueClick(evt, key) {
    evt.preventDefault();
    if (this.issueClickTimer) {
      window.clearTimeout(this.issueClickTimer);
      this.issueClickTimer = undefined;
      return;
    }
    this.issueClickTimer = window.setTimeout(() => {
      shell.openExternal(this.props.connection.jiraUrl + '/browse/' + key);
    }, 1000);
  }

  handleIssueDoubleClick(evt, issueId) {
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
    const {selectedFilter, filters, issues, active } = this.props;
    return (
      <div className="container-fluid">
        <form>
          <div className="form-group">
            <label> Filter </label>
              <select value={selectedFilter} className="form-control" disabled={filters.length == 0} onChange={evt => this.handleFilterSelect(evt.target.value)}>
                <option value="" disabled={selectedFilter !== ''}>Please select a filter</option>
                {
                  filters.map(filter =>
                    <option key={filter.id} value={filter.id}>{filter.name}{(filter.description ? (' - ' + filter.description) : '')}</option>
                  )
                }
              </select>
          </div>
        </form>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Key</th>
                <th onSelect={evt => {evt.preventDefault();}}>Summary</th>
              </tr>
            </thead>
            <tbody>
              {
                issues.map(issue =>
                  <tr key={issue.id} onDoubleClick={evt => this.handleIssueDoubleClick(evt, issue.id)} className={issue.id === active ? 'success' : ''}>
                    <td className="no-wrap">
                      <a href="" onClick={evt => this.handleIssueClick(evt, issue.key)}>{issue.key}</a>
                    </td>
                    <td>
                      {issue.summary}
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Reporter;
