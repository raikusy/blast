import { IElement } from "./BaseElement";
import { elements } from "./elements";
import { debug } from ".";
import { HostContext, Props } from "../types";

export default function createElement(elementType: keyof typeof elements, props: Props, hostContext: HostContext) {
  const Element: IElement = elements[elementType];

  debug(`createElement(${elementType})`);

  if (!Element) throw new Error(`unknown element of type '${elementType}'`);

  return new Element(props, hostContext);
}
