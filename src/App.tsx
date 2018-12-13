import * as React from "react";
import * as Y from "yahoo";

export default class App extends React.Component<{}, {}> {
  public render() {
    return(
      <div id="App">
        <h1>Hello World!!</h1>
        <div id="map" style={{width: "900px", height: "400px"}}></div>
      </div>
    );
  }

  public componentDidMount() {
    const ymap = new Y.Map(
      "map",
      {configure: {
        doubleClickZoom: true,
        dragging: true,
      }},
    );
    ymap.addControl(new Y.LayerSetControl());
    ymap.addControl(new Y.SliderZoomControlVertical());

    ymap.drawMap(
      new Y.LatLng(36.692870, 139.827425),
      10,
      Y.LayerSetId.NORMAL,
    );
  }
}
