import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import AppBar from "react-toolbox/lib/app_bar";
import { List, ListItem } from "react-toolbox/lib/list";
import { Chip } from "react-toolbox/lib/chip";
import Link from "react-toolbox/lib/link";

import { RootState, Spot } from "./state/reducers";
import { init } from "./state/actions";

interface DispatchProps {
  init: () => void;
}

class App extends React.Component<RootState & DispatchProps> {
  public render() {
    return(
      <div id="App">
        <AppBar
            title="とちすぽっと！"
            fixed={true}
            scrollHide={true}
            flat={true}
            />
        <div
            style={{
              display: "flex",
              position: "fixed",
              top: "80px",
              width: "100%",
            }}
            >
          <div
              id="map"
              style={{
                height: "500px",
                position: "relative",
                width: "calc(100% - 300px)",
              }}
              >
          </div>
          <div
              style={{
                height: "500px",
                overflow: "auto",
                width: "300px",
              }}
              >
            <List selectable={true}>
              {this.props.spots && this.props.spots.map((spot: Spot) => <ListItem itemContent={<div><a href="#">{spot.name}</a><Chip><Link href="#">{spot.genres[0]}</Link></Chip></div>} selectable={false} />)}
            </List>
          </div>
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
