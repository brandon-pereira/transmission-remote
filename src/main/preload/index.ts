import { contextBridge } from 'electron';
import servers from './servers';
import transmission from './transmission';

const api = {
  servers,
  transmission,
};

contextBridge.exposeInMainWorld('electron', api);

export default api;
