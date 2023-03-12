import useSWR from 'swr';

const fetcher = (id: number) => {
  return window.electron.transmission.getTorrent(id);
};

function useTorrent(id?: number) {
  const {
    data: torrent,
    mutate,
    error,
  } = useSWR(`${id}`, fetcher, {
    refreshInterval: 2000,
  });

  return {
    torrent,
    error,
    mutate,
    loading: !torrent && !error,
  };
}

export default useTorrent;
