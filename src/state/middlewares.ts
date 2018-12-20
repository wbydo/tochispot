import * as url from "url";
import { Dispatch } from "redux";
import * as Y from "yahoo";

import * as types from "./types";
import * as actions from "./actions";
import { RootState, Action, Spot } from "./reducers";

type JsonResult = Spot[];

interface Store {
  getState: () => RootState;
  dispatch: Dispatch;
}

type Middleware = (store: Store) => (next: Dispatch) => (action: Action) => void;

export class MapManageer {
  private readonly CENTER = new Y.LatLng(36.92374740858853, 139.86856887304685);
  private readonly DEFAULT_ZOOM = 11;

  private ymap: Y.Map | undefined;
  private currentInfoWindow: Y.InfoWindow | null = null;
  private markers = new Map<string, {marker: Y.Marker, anchor: HTMLAnchorElement}>();

  public middleware: Middleware
      = (store: Store) => (next: Dispatch) => async (action: Action) => {

    switch (action.type) {
      case types.INIT:
        this.init(next, store);
        break;

      case types.ADD_SPOT:
        this.addSpot(action);
        next(action);
        break;

      case types.PAN_TO:
        this.panTo(action);
        next(action);
        break;

      default:
        next(action);
        break;
    }
  }

  private addSpot = (action: ReturnType<typeof actions.addSpot>) => {
    if (this.ymap === undefined) {
      throw new Error();
    }

    const spot = action.payload.spot;
    const latLng = new Y.LatLng(
      spot.lat,
      spot.lng,
    );

    const marker = new Y.Marker(latLng);
    const anchor = document.createElement( "a" );
    anchor.text = spot.name;
    anchor.href = spot.url;
    anchor.target = "_blank";

    marker.bind("click", () => {
      this.currentInfoWindow = marker.openInfoWindow(anchor);
    });

    this.markers.set(spot.name, {marker, anchor});
    this.ymap.addFeature(marker);
  }

  private panTo = (action: ReturnType<typeof actions.panTo>) => {
    if (this.ymap === undefined) {
      throw new Error();
    }
    const spot = action.payload.spot;

    const latLng = new Y.LatLng(
      spot.lat,
      spot.lng,
    );

    this.ymap.panTo(latLng, true);
    this.ymap.setZoom(13, true, latLng, true);
    const result = this.markers.get(spot.name);
    if (result) {
      this.currentInfoWindow = result.marker.openInfoWindow(result.anchor);
    }
  }

  private init = async (_: Dispatch, store: Store) => {
    this.ymap = new Y.Map(
      "map",
      {configure: {
        doubleClickZoom: true,
        dragging: true,
      }},
    );

    this.ymap.addControl(new Y.LayerSetControl());
    this.ymap.addControl(new Y.SliderZoomControlVertical());
    this.ymap.addControl(new Y.ScaleControl());

    this.ymap.drawMap(
      this.CENTER,
      this.DEFAULT_ZOOM,
      Y.LayerSetId.NORMAL,
    );

    this.ymap.bind("click", () => {
      if (this.ymap === undefined) {
        throw new Error();
      }
      this.ymap.panTo(this.CENTER, true);
      this.ymap.setZoom(11, true, this.CENTER, true);

      if (this.currentInfoWindow) {
        this.currentInfoWindow.hide();
      }
    });

    const baseUrl =  location.href;
    const targetUrl = url.resolve(baseUrl, "data/spot.json");
    const resp = await fetch(targetUrl);
    const result = (await resp.json()) as JsonResult;

    for (const spot of result) {
      store.dispatch(actions.addSpot(spot));
    }
  }
}
