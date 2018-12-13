import * as React from "react";
import * as Y from "yahoo";

export default class App extends React.Component<{}, {}> {
  public render() {
    return(
      <div id="App">
        <h1>Hello World!!</h1>
        <div id="map" style={{width: "500px", height: "300px"}}></div>
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
      new Y.LatLng(36.550286, 139.929102),
      17,
      Y.LayerSetId.NORMAL,
    );
  }
}
