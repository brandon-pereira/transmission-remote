import type api from '../main/preload/index';

declare global {
  interface Window {
    electron: typeof api;
  }
}

export {};
