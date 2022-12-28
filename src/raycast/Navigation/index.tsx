import React, { Fragment, createContext, useCallback, useContext, useEffect, useState } from "react";

import { NavigationRoot } from "../../elements/types";
import { useWsServer } from "../internal/WsServerProvider";

export const NavigationContext = createContext<{
  push: (component: React.ReactNode) => void;
  pop: () => void;
}>({
  push: () => {
    /* noop */
  },
  pop: () => {
    /* noop */
  },
});

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [stack, setStack] = useState<React.ReactNode[]>([]);
  const server = useWsServer();

  const push = useCallback(
    (component: React.ReactNode) => {
      setStack((previous) => [...previous, component]);
    },
    [setStack]
  );

  const pop = useCallback(() => {
    setStack((previous) => previous.slice(0, -1));
  }, [setStack]);

  useEffect(() => {
    if (!server) {
      return;
    }

    server.register("blast-global:pop", () => {
      pop();

      return null;
    });

    return () => {
      delete (server as any).namespaces["/"].rpc_methods["blast-global:pop"];

      // server.removeListener("blast-global:pop", pop);
    };
  }, [pop, server]);

  return (
    <NavigationContext.Provider value={{ push, pop }}>
      <NavigationRoot>
        {children}

        {stack.map((component, index) => component && <Fragment key={`navigation_${index}`}>{component}</Fragment>)}
      </NavigationRoot>
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
