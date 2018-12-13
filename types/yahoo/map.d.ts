import { LatLng } from "./latLng";
import { LayerSetId } from "./layerSetId";

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

  constructor(id: string, configure: Configure);
}
