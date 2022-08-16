import useSWR from 'swr';

const fetcher = () => window.electron.transmission.getTorrents();

function useTorrents() {
  const {
    data: torrents,
    mutate,
    error,
  } = useSWR('torrents', fetcher, {
    refreshInterval: 2000,
  });

  return {
    torrents,
    error,
    refetch: mutate,
    loading: !torrents && !error,
  };
}

export default useTorrents;
