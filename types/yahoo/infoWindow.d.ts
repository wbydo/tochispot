import { Point } from "./point";

export interface InfoOptions {
  image: string;
  maxContent: string;
  maximize: boolean;
}

declare class InfoWindow {
  constructor(
      container: Node,
      position: Point,
      content: string | Node,
      options: InfoOptions)
}
