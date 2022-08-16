import useSWR from 'swr';

const fetcher = () => window.electron.transmission.getTorrents();

function useTorrents() {
  const { data: torrents, error } = useSWR('torrents', fetcher, {
    refreshInterval: 2000,
  });

  return {
    torrents,
    error,
    loading: !torrents && !error,
  };
}

export default useTorrents;
