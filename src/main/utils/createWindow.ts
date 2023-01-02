import {
  app,
  BrowserWindowConstructorOptions,
  BrowserWindow,
  shell,
  nativeTheme,
} from 'electron';
import path from 'path';
import { resolveHtmlPath } from './pathResolvers';

interface CreateWindowOpts {
  route?: string;
  windowOpts: BrowserWindowConstructorOptions;
}

const resourcePath = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../../assets');

const preloadPath = app.isPackaged
  ? path.join(__dirname, 'preload/index.js')
  : path.join(__dirname, '../../../.erb/dll/preload.js');

const getAssetPath = (...paths: string[]): string => {
  return path.join(resourcePath, ...paths);
};

export function navigate(window: BrowserWindow, route?: string) {
  window.loadURL(`${resolveHtmlPath('index.html')}#${route || ''}`);
}

async function createWindow({ route, windowOpts }: CreateWindowOpts) {
  // if (config.isDebug) {
  //   await installExtensions();
  // }

  const window = new BrowserWindow({
    webPreferences: {
      // devTools: false,
      preload: preloadPath,
    },
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#2e2c2c' : '#efefef',
    icon: getAssetPath('icon.png'),
    ...windowOpts,
  });

  navigate(window, route);

  // Open urls in the user's browser
  window.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  return window;
}

export default createWindow;
