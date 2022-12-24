import { FiberRoot } from "react-reconciler";
import type { Server } from "rpc-websockets";

import JSONTreeRenderer from "./reconciler";
import Command from "./elements/Command";
import { createDebug } from "./utils/debug";

const debug = createDebug("blast:render");

export function render(component: React.ReactNode, server?: Server) {
  const rootElement = new Command({
    server,
  });

  const root: FiberRoot | null = JSONTreeRenderer.createContainer(
    rootElement,
    0,
    null,
    true,
    null,
    "",
    (error) => {
      // noop
      debug(`onRecoverableError`, error);
    },
    null
  );

  JSONTreeRenderer.injectIntoDevTools({
    bundleType: 1,
    rendererPackageName: "blast",
    version: "0.0.1",
  });

  JSONTreeRenderer.updateContainer(component, root, null);

  return rootElement;
}

export default render;
