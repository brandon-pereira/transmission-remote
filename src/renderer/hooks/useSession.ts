import useSWR from 'swr';

const fetcher = () => window.electron.transmission.getSession();

function useSession() {
  const {
    data: session,
    mutate,
    error,
  } = useSWR('session', fetcher, {
    refreshInterval: 1000 * 60 * 2,
  });

  return {
    session,
    error,
    refetch: mutate,
    mutate,
    loading: !session && !error,
  };
}

export default useSession;
