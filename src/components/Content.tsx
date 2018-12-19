import * as React from "react";

import SideBar from "../containers/sidebar";

import * as styles from "./Content.css";

interface Props {
  init: () => void;
}

export default class Content extends React.Component<Props> {
  public render() {
    return(
      <div className={styles.flexContainer}>
        <div id="map" className={styles.map}></div>
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
