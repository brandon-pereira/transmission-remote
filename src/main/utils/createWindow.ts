import {
  app,
  BrowserWindowConstructorOptions,
  BrowserWindow,
  shell,
} from 'electron';
import path from 'path';
import installExtensions from './installExtensions';
import { resolveHtmlPath } from './pathResolvers';

interface CreateWindowOpts {
  route?: string;
  windowOpts: BrowserWindowConstructorOptions;
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const resourcePath = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../../assets');

const preloadPath = app.isPackaged
  ? path.join(__dirname, 'preload.js')
  : path.join(__dirname, '../../../.erb/dll/preload.js');

const getAssetPath = (...paths: string[]): string => {
  return path.join(resourcePath, ...paths);
};

async function createWindow({ route, windowOpts }: CreateWindowOpts) {
  if (isDebug) {
    await installExtensions();
  }

  const window = new BrowserWindow({
    webPreferences: {
      // devTools: false,
      preload: preloadPath,
    },
    icon: getAssetPath('icon.png'),
    ...windowOpts,
  });

  window.loadURL(`${resolveHtmlPath('index.html')}#${route}`);

  // Open urls in the user's browser
  window.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  return window;
}

export default createWindow;

//   const menuBuilder = new MenuBuilder(mainWindow);
//   menuBuilder.buildMenu();

//   // Open urls in the user's browser
//   mainWindow.webContents.setWindowOpenHandler((edata) => {
//     shell.openExternal(edata.url);
//     return { action: 'deny' };
//   });

//   // Remove this if your app does not use auto updates
//   new AutoUpdater();
// };
