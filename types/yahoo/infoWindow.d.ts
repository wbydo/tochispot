import { Point } from "./point";

export interface InfoOptions {
  image: string;
  maxContent: string;
  maximize: boolean;
}

declare class InfoWindow {
  public show: () => void;
  public hide: () => void;

  constructor(
      container: Node,
      position: Point,
      content: string | Node,
      options: InfoOptions)
}
