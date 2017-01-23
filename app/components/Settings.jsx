import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router'
import { ipcRenderer } from 'electron';

import { STATUS_CONNECTED } from '../actions';

const Settings = props => {
  const test = (e) => {
    e.preventDefault();
    props.testConnection(props.connection);
  }

  const save = (e) => {
    e.preventDefault();
    const result = ipcRenderer.sendSync('set-connection-details', props.connection);
    if (result === true) {
      hashHistory.push('/');
    } else {
      console.log(result);
    }
  }

  const { connection, setUsername, setPassword, setJiraUrl, status } = props;
  const { jiraUrl, username, password } = connection;

  return (
    <div className="container-fluid">
      <h1>Settings</h1>
      <form>
        <div className="form-group">
          <label>JIRA URL</label>
          <input name="jiraUrl" className="form-control" value={jiraUrl} onChange={e => {setJiraUrl(e.target.value);}}/>
        </div>
        <div className="form-group">
          <label>username</label>
          <input name="username" className="form-control" value={username} onChange={e => {setUsername(e.target.value);}}/>
        </div>
        <div className="form-group">
          <label>password</label>
          <input name="password" className="form-control" type="password" value={password} onChange={e => {setPassword(e.target.value)}}/>
        </div>
        <div className="form-group">
          <button className="btn btn-default" disabled={!username || !password || !jiraUrl} onClick={e => {test(e)}}>Test connection</button>
          <button className="btn btn-primary" disabled={status != STATUS_CONNECTED || !username || !password || !jiraUrl} onClick={e => {save(e)}}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default Settings;
