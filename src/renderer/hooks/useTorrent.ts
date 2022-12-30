import useSWR from 'swr';

const fetcher = (id: string) => {
  return window.electron.transmission.getTorrent(id);
};

function useTorrent(id?: string) {
  const {
    data: torrent,
    mutate,
    error,
  } = useSWR(id, fetcher, {
    refreshInterval: 2000,
  });

  return {
    torrent,
    error,
    refetch: mutate,
    loading: !torrent && !error,
  };
}

export default useTorrent;
