import { LatLng } from "./latLng";
import { LayerSetId } from "./layerSetId";
import { Control } from "./control";
import { Marker } from "./marker";

interface Configure {
  configure: {
    doubleClickZoom: boolean;
    dragging: boolean;
  };
}

export declare class Map {
  public drawMap: (
      latLng: LatLng,
      zoomLevel: number,
      layerSetId: LayerSetId,
      ) => void;

  public addControl: (control: Control) => void;
  public addFeature: (marker: Marker) => void;
  public bind: (
      type: "click",
      callback: (arg: LatLng) => void,
      ) => void;

  constructor(id: string, configure: Configure);
}
