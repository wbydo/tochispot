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
  private ymap: Y.Map | undefined;
  private readonly CENTER = new Y.LatLng(36.92374740858853, 139.86856887304685);

  public middleware: Middleware
      = (store: Store) => (next: Dispatch) => async (action: Action) => {

    switch (action.type) {
      case types.INIT:
        this.init(next, store);
        break;

      case types.ADD_SPOT:
        if (this.ymap === undefined) {
          throw new Error();
        }

        const latLng = new Y.LatLng(
          action.payload.spot.lat,
          action.payload.spot.lng,
        );

        const marker = new Y.Marker(latLng);
        const anchor = document.createElement( "a" );
        anchor.text = action.payload.spot.name;
        anchor.href = action.payload.spot.url;
        anchor.target = "_blank";
        marker.bindInfoWindow(anchor);
        this.ymap.addFeature(marker);

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

  private panTo = (action: ReturnType<typeof actions.panTo>) => {
    if (this.ymap === undefined) {
      throw new Error();
    }

    const latLng = new Y.LatLng(
      action.payload.spot.lat,
      action.payload.spot.lng,
    );

    this.ymap.panTo(latLng, true);
    this.ymap.setZoom(13, true, latLng, true);
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
      11,
      Y.LayerSetId.NORMAL,
    );

    this.ymap.bind("click", () => {
      this.ymap!.panTo(this.CENTER, true);
      this.ymap!.setZoom(11, true, this.CENTER, true);
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
