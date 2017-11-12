const { dialog, Menu, MenuItem, ipcMain, shell } = require('electron');
const { writeFileSync, readdirSync, mkdirSync } = require('fs');
const { title } = require('change-case');
const path = require('path');
const electron = require('electron');
const Store = require('electron-store');
const store = new Store();
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let current;
let themes = loadThemes();

function makeMenu() {
  return [
    {
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          role: 'open',
          accelerator: 'Cmd+O',
          click: () => {
            const files = dialog.showOpenDialog({ properties: ['openFile'] });
            if (files) {
              current = files[0];
              mainWindow.webContents.send('open', files[0]);
            }
          }
        },
        {
          label: 'Save',
          role: 'save',
          accelerator: 'Cmd+S',
          click() {
            if (current) {
              mainWindow.webContents.send('save', current);
            } else {
              const file = dialog.showSaveDialog();
              if (file) {
                current = file;
                mainWindow.webContents.send('save', file);
              }
            }
          }
        },
        {
          label: 'Save As',
          role: 'save-as',
          accelerator: 'Cmd+Shift+S',
          click: () => {
            const file = dialog.showSaveDialog();
            if (file) {
              mainWindow.webContents.send('save', file);
              current = file;
            }
          }
        },
        {
          label: 'Export as PDF',
          role: 'print',
          accelerator: 'Cmd+Shift+E',
          click() {
            const file = dialog.showSaveDialog();
            if (file) {
              mainWindow.webContents.printToPDF(
                {
                  marginsType: 1,
                  printBackground: true,
                  pageSize: 'Letter'
                },
                (err, data) => {
                  writeFileSync(file, data);
                }
              );
            }
          }
        },
        { role: 'quit', label: 'Quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Themes',
      submenu: makeThemesMenu()
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }]
    }
  ]
}

function loadTheme(theme, styles, variant) {
  store.set('theme.id', theme);
  store.set('theme.css', styles);
  if (variant) {
    store.set('theme.variant', variant);
  }
  setMenu();
}

function makeThemesMenu() {
  return [
    {
      label: 'Tufte',
      click: () => loadTheme('tufte', '../assets/tufte.css')
    },
    ...themes.map(theme => {
    const themeMatch = id => id === store.get('theme.id');
    const colorMatch = color => color === store.get('theme.variant');
    let menu = theme.variants ? {
      label: theme.name,
      submenu: theme.variants.map(v => ({
        label: title(v),
        checked: themeMatch(theme.id) && colorMatch(v),
        type: 'checkbox',
        click: () => loadTheme(theme.id, theme.css, v)
      }))
    } : {
      label: theme.name,
      checked: themeMatch(theme.id),
      type: 'checkbox',
      click: () => loadTheme(theme.id, theme.css)
    };
    return menu;
  }) ];
}

function loadThemes() {
  const storedir = path.dirname(store.path);
  let themes;
  try {
    themes = readdirSync(path.resolve(storedir, './themes'));
  } catch (e) {
    mkdirSync(path.resolve(storedir, './themes'));
    themes = readdirSync(path.resolve(storedir, './themes'));
  }
  return themes.filter(f => !f.startsWith('.')).map(dir => {
    const theme_dir = path.resolve(storedir, './themes', dir);
    // @todo - sanity check that file actually exists
    const manifest = require(theme_dir + '/package.json');
    const id = manifest.name;
    const name = manifest.description;
    const variants = manifest.provides;
    const css = manifest.styles || path.resolve(theme_dir, 'assets/styles.css');
    return { id, name, path: theme_dir, variants, css };
  });
}

function setMenu() {
  const menu = Menu.buildFromTemplate(makeMenu());
  Menu.setApplicationMenu(menu);
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1680,
    height: 1050,
    minWidth: 1280,
    titleBarStyle: 'hidden'
  });

  setMenu();
  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'public/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  store.onDidChange('theme.id', id => {
    mainWindow.webContents.send('theme.id', id);
  });

  store.onDidChange('theme.variant', variant => {
    mainWindow.webContents.send('theme.variant', variant);
  });

  store.onDidChange('theme.css', css => {
    mainWindow.webContents.send('theme.css', css);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
