import { useCallback } from 'react';
import useSession from './useSession';

function useSpeedLimit() {
  const { session, mutate } = useSession();
  const isActive = Boolean(session?.['alt-speed-enabled']);
  const onToggle = useCallback(async () => {
    window.electron.transmission.setSession({
      'alt-speed-enabled': !isActive,
    });
    await mutate(
      {
        'alt-speed-enabled': !isActive,
      },
      false
    );
  }, [isActive, mutate]);

  return [isActive, onToggle] as const;
}

export default useSpeedLimit;
