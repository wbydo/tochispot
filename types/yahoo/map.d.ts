import { LatLng } from "./latLng";
import { LayerSetId } from "./layerSetId";
import { Control } from "./control";

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

  constructor(id: string, configure: Configure);
}
