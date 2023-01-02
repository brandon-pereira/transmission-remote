import { useMemo } from 'react';
import useSWR from 'swr';

const fetcher = () => window.electron.servers.getServers();

function useServers() {
  const { data: servers, error } = useSWR('servers', fetcher, {
    // refreshInterval: 2000,
  });

  const activeServer = useMemo(
    () => servers?.find((s) => s.isActive),
    [servers]
  );

  return {
    servers,
    activeServer,
    error,
  };
}

export default useServers;
