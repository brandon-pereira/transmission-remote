import { useState, useEffect, useCallback } from 'react';
import { ITorrent } from 'types/ITorrent';

function useTorrents() {
  const [torrents, setTorrents] = useState<ITorrent[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const cleanup = window.electron.transmission.onTorrents(
      (updatedTorrents) => {
        setTorrents(updatedTorrents);
        setLoading(false);
      }
    );
    return () => cleanup();
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    window.electron.transmission.getTorrents();
  }, []);

  useEffect(() => {
    window.electron.transmission.getTorrents();
    setInterval(() => {
      window.electron.transmission.getTorrents();
    }, 5000);
  }, []);

  return {
    torrents,
    refresh,
    loading: isLoading,
  };
}

export default useTorrents;
