'use strict'

const { app, Menu, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const menu = require('./menu');
const mainMenu = Menu.buildFromTemplate(menu.main);
const keytar = require('keytar');
const Config = require('electron-config');
let win;

const appName = 'Reporter';
const config = new Config();

ipcMain.on('set-connection-details', (event, connection) => {
  if (!connection.jiraUrl || !connection.username || !connection.password) {
    console.log('Invalid connection: ' + Object.assign({}, connection, {
      password: connection.password ? '***' : '<empty>'
    }));
    event.returnValue = 'Missing field(s)';

  } else {
    if (keytar.replacePassword(appName, connection.username, connection.password)) {
      config.set('jira', {
        user: connection.username,
        url: connection.jiraUrl
      });
      event.returnValue = true;
    } else {
      console.log(`Could not set the password for user ${connection.username}`);
      event.returnValue = `Could not set the password for user ${connection.username}`;
    }
  }
});

ipcMain.on('get-connection-details', (event) => {
  let jira = config.get('jira');
  if (!jira) {
    event.returnValue = {};
  } else {
    let connection = {
      username: jira.user,
      jiraUrl: jira.url
    }
    if (jira.user) {
      let pw = keytar.getPassword(appName, jira.user);
      connection.password = pw;
    }
    event.returnValue = connection;
  }
});

function createWindow() {
  let route = '/';
  let jira = config.get('jira');

  if (!jira || !jira.url || !jira.user) {
    route = '/settings';
  } else {
    let pw = keytar.getPassword(appName, jira.user);
    if (!pw) {
      route = '/settings';
    }
  }

  let index = 'index.html';
  if (process.env.HOT) {
    index = 'index-hot.html';
  }

  win = new BrowserWindow({
    show: false,
    width: 1200,
    height: 800
  });
  Menu.setApplicationMenu(mainMenu);



  win.loadURL(url.format({
    pathname: `${__dirname}/${index}`,
    protocol: 'file:',
    hash: `#${route}`,
    slashes: true
  }));

  win.webContents.on('did-finish-load', () => {
   win.show();
   win.focus();
  });

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
