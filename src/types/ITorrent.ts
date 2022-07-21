export enum TorrentStatus {
  'STOPPED' = 0, // Torrent is stopped
  'CHECK_WAIT' = 1, // Queued to check files
  'CHECK' = 2, // Checking files
  'DOWNLOAD_WAIT' = 3, // Queued to download
  'DOWNLOAD' = 4, // Downloading
  'SEED_WAIT' = 5, // Queued to seed
  'SEED' = 6, // Seeding
  'ISOLATED' = 7, // Torrent can't find peers
}

export interface ITorrent {
  id: string;
  title: string;
  eta: number | null;
  percentDone: number;
  downloadSize: number;
  totalSize: number;
  priority?: number;
  addedDate?: Date;
  creationDate?: Date;
  status: TorrentStatus;
}
