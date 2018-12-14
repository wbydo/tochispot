import * as React from "react";
import * as Y from "yahoo";
import {connect} from "react-redux";
import {Dispatch} from "redux";

import { RootState, Spot } from "./state/reducers";
import { init } from "./state/actions";

interface DispatchProps {
  init: () => void;
}

class App extends React.Component<RootState & DispatchProps> {
  public render() {
    return(
      <div id="App">
        <h1>Hello World!!</h1>
        <div id="map" style={{width: "900px", height: "400px"}}></div>
        <ul>
          {this.props.spots && this.props.spots.map((spot: Spot) => <li>{spot.name}</li>)}
        </ul>
      </div>
    );
  }

  public componentDidMount = async () => {
    this.props.init();
    const ymap = new Y.Map(
      "map",
      {configure: {
        doubleClickZoom: true,
        dragging: true,
      }},
    );
    ymap.addControl(new Y.LayerSetControl());
    ymap.addControl(new Y.SliderZoomControlVertical());
    ymap.addControl(new Y.ScaleControl());

    ymap.drawMap(
      new Y.LatLng(36.692870, 139.827425),
      10,
      Y.LayerSetId.NORMAL,
    );
  }
}

export default connect(
  (state: RootState) => state,
  (dispatch: Dispatch) => {
    return {
      init: () => dispatch(init()),
    };
  },
)(App);
