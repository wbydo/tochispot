import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Chip } from "react-toolbox/lib/chip";

import { actions, RootState } from "../state";

import * as styles from "./content.css";

import SideBar from "./sidebar";

interface Props {
  init: () => void;
  filter: (visibleGenre: string) => void;
  reset: () => void;
  genres?: {
    active: string | null,
    others: Set<string>,
  };
}

class Content extends React.Component<Props> {
  public render() {
    return(
      <div className={styles.flexContainer}>
        <div className={styles.main}>
          <div id="map" className={styles.map}></div>
          <div className={styles.genres}>
            {this.chips()}
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

  private genreToChip = (genre: string, active: boolean) => {
    return (
      <Chip deletable={active} onDeleteClick={() => active && this.props.reset()}>
        <a href="#" onClick={() => this.props.filter(genre)}>{genre}</a>
      </Chip>
    );
  }

  private chips = () => {
    const {genres} = this.props;

    if (genres === undefined) {
      return null;
    }

    if (genres.active !== null) {
      return [
        this.genreToChip(genres.active, true),
        ...Array(...genres.others.values()).map((genre) => this.genreToChip(genre, false)),
      ];
    } else {
      return [
        ...Array(...genres.others.values()).map((genre) => this.genreToChip(genre, false)),
      ];
    }
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    genres: state.genres,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    filter: (visibleGenre: string) => dispatch(actions.filter(visibleGenre)),
    init: () => dispatch(actions.init()),
    reset: () => dispatch(actions.reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
