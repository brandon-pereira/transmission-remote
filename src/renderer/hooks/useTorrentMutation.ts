import { useCallback } from 'react';
import useTorrent from './useTorrent';

function useTorrentMutation(tid?: number) {
  const { mutate } = useTorrent(tid);
  // const isActive = Boolean(session?.['alt-speed-enabled']);
  const editTorrent = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (opts: Record<string, unknown>) => {
      if (!tid) {
        return;
      }
      await window.electron.transmission.editTorrent(tid, opts);
      await mutate();
    },
    [tid, mutate]
  );

  return editTorrent;
}

export default useTorrentMutation;
