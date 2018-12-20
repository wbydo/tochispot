import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Chip } from "react-toolbox/lib/chip";
import Link from "react-toolbox/lib/link";

import { SpotWithVisibility, actions } from "../state";

interface SpotProps {
  spot: SpotWithVisibility;
  panTo: (spot: SpotWithVisibility) => void;
  filter: (visibleGenre: string) => void;
}

const SideBarItem = (spotProps: SpotProps) => {
  const {spot, panTo, filter} = spotProps;
  const {name, genres} = spot;
  return (
    <div>
      <a href="#" onClick={() => panTo(spot)}>{name}</a>
      {genres.map((genre) => {
        return(
          <Chip>
            <Link href="#" onClick={() => filter(genre)}>{genre}</Link>
          </Chip>
        );
      })}
    </div>
  );
};

const mapDispatchProps = (dispatch: Dispatch) => {
  return {
    filter: (visibleGenre: string) => dispatch(actions.filter(visibleGenre)),
    panTo: (spot: SpotWithVisibility) => dispatch(actions.panTo(spot)),
  };
};

export default connect(
  null,
  mapDispatchProps,
  ({}, {panTo, filter}, ownProps: {spot: SpotWithVisibility}) => ({panTo, filter, spot: ownProps.spot}),
)(SideBarItem);
