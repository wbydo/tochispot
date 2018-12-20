import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { actions } from "../state";

import * as styles from "./content.css";

import SideBar from "./sidebar";

const mapDispatchProps = (dispatch: Dispatch) => {
  return {
    init: () => dispatch(actions.init()),
  };
};

interface Props {
  init: () => void;
}

class Content extends React.Component<Props> {
  public render() {
    return(
      <div className={styles.flexContainer}>
        <div className={styles.main}>
          <div id="map" className={styles.map}></div>
          <div className={styles.genres}>hogefugapiyo</div>
        </div>
        <div className={styles.sideBar}>
          <SideBar />
        </div>
      </div>
    );
  }

  public componentDidMount = () => {
    this.props.init();
  }
}

export default connect(null, mapDispatchProps)(Content);
