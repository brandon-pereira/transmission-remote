import { ipcMain } from 'electron';

import Store from 'electron-store';
import type { ServerConfiguration } from './transmission/transmission';

type StoreTypes = {
  'transmission-servers': ServerConfiguration[];
};

const store = new Store<StoreTypes>();

ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});

ipcMain.on('electron-store-set', async (_event, key, val) => {
  store.set(key, val);
});

export default store;
