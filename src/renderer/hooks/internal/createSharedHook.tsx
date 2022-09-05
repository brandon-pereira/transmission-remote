import React, { createContext, useContext } from 'react';

function createSharedHook<Response>(useHookOnce: () => Response) {
  const Context = createContext<Response | undefined>(undefined);

  function Provider({ children }: { children: React.ReactNode }) {
    const value = useHookOnce();
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useConsumer() {
    const ctx = useContext(Context);

    if (!ctx) {
      throw new Error('Missing provider or no value supplied to provider.');
    }

    return ctx;
  }

  return { useConsumer, Context, Provider };
}

export default createSharedHook;
