const main = [
  {
    label: 'Reporter',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        }
      },
      {
        label: 'Settings',
        click (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.send('browser-navigate', '/settings')
          }
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  }
];

module.exports = {
  main: main
};
