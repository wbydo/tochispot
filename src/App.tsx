import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import AppBar from "react-toolbox/lib/app_bar";

import { RootState, Spot } from "./state/reducers";
import { init } from "./state/actions";

interface DispatchProps {
  init: () => void;
}

class App extends React.Component<RootState & DispatchProps> {
  public render() {
    return(
      <div id="App">
        <AppBar title="とちすぽっと！" fixed={true} scrollHide={true} flat={true}/>
        <div
            style={{
              position: "relative",
              top: "64px",
            }}
        >

          <h1>Hello World!!</h1>
          <div id="map" style={{width: "900px", height: "400px"}}></div>
          <ul>
            {this.props.spots && this.props.spots.map((spot: Spot) => <li>{spot.name}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  public componentDidMount = () => {
    this.props.init();
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
