import type { api } from '../main/preload';

declare global {
  interface Window {
    electron: typeof api;
  }
}

export {};
