import * as React from "react";
import * as ReactDOM from "react-dom";
import Y from "yahoo";

import App from "./App";

ReactDOM.render(
  <App />,
  document.getElementById("root"),
);

window.onload = () => {
  const ymap = new Y.Map(
    "map",
    {configure: {
      doubleClickZoom: true,
      dragging: false,
      scrollWheelZoom: true,
      singleClickPan: true,
    }},
  );
  ymap.drawMap(
    new Y.LatLng(36.550286, 139.929102),
    17,
    Y.LayerSetId.NORMAL,
  );
};
