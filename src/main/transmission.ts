import { dialog, ipcMain, ipcRenderer } from 'electron';
import Transmission from 'transmission-promise';

const transmission = new Transmission({
  host: 'localhost', // default 'localhost'
  port: 9091, // default 9091
  // username: '', // default blank
  // password: '', // default blank
  //   ssl: true, // default false use https
  //   url: '/my/other/url', // default '/transmission/rpc'
});

(async () => {
  try {
    const files = await transmission.all();
    console.log('FILESSS', files);
  } catch (err) {
    console.log('ERRRR');
  }
})();

ipcMain.on('open-file-picker', async () => {
  const file = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Torrents', extensions: ['torrent'] }],
  });
  console.log(file);
  transmission.addFile(file.filePaths[0]);
});

ipcMain.on('get-active', async (event) => {
  const files = await transmission.all();
  event.reply('files', files);
});
