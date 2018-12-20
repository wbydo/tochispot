import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Chip } from "react-toolbox/lib/chip";
import Link from "react-toolbox/lib/link";

import { actions, RootState } from "../state";

import * as styles from "./content.css";

import SideBar from "./sidebar";

interface Props {
  init: () => void;
  genres: Set<string> | undefined;
}

class Content extends React.Component<Props> {
  public render() {
    return(
      <div className={styles.flexContainer}>
        <div className={styles.main}>
          <div id="map" className={styles.map}></div>
          <div className={styles.genres}>
            {this.props.genres && Array(...this.props.genres.values()).map((genre) => {
              return (
                <Chip>
                  <Link href="#">{genre}</Link>
                </Chip>
              );
            })}
          </div>
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

const mapStateToProps = (state: RootState) => {
  return {
    genres: state.genres,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    init: () => dispatch(actions.init()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
