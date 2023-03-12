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

interface ITorrentFile {
  id: number;
  title: string;
  total: number;
  downloaded: number;
  wanted: boolean;
}
export interface ITorrent {
  id: number;
  // Title of the torrent
  title: string;
  // eta from epoch till completion
  eta: number | null;
  // percentage completed downloading
  percentDone: number;
  // the ratio of seed to download
  ratio: number;
  // the current torrent status
  status: TorrentStatus;
  // true when finished downloading and seeding
  isFinished: boolean;
  sizeStats: {
    total: number;
    downloaded: number;
    uploaded: number;
  };
  // peer stats info
  peerStats: {
    limit: number;
    connected: number;
    givers: number;
    getters: number;
  };
  // download / upload speeds
  speeds: {
    download: number;
    upload: number;
  };
  // torrent sub-file details
  files: ITorrentFile[];
  // original, raw torrent
  __raw: Readonly<unknown>;
}
