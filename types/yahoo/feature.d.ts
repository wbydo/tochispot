import { InfoWindow, InfoOptions } from "./infoWindow";

export declare class Feature {
  public bindInfoWindow: (content: string | Node, infoWindowOptions?: InfoOptions) => void;
  public openInfoWindow: (content: string | Node, infoWindowOptions?: InfoOptions) => InfoWindow;
  public bind: (
      type: "click",
      callback: (...args: any) => void,
      ) => void;

  constructor()
}
