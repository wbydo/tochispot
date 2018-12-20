import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Chip } from "react-toolbox/lib/chip";
import Link from "react-toolbox/lib/link";

import { Spot, actions } from "../state";

interface SpotProps {
  spot: Spot;
  panTo: (spot: Spot) => void;
}

const SideBarItem = (spotProps: SpotProps) => {
  const {spot, panTo} = spotProps;
  const {name, genres} = spot;
  return (
    <div>
      <a href="#" onClick={() => panTo(spot)}>{name}</a>
      {genres.map((genre) => {
        return(
          <Chip>
            <Link href="#">{genre}</Link>
          </Chip>
        );
      })}
    </div>
  );
};

const mapDispatchProps = (dispatch: Dispatch) => {
  return {
    panTo: (spot: Spot) => dispatch(actions.panTo(spot)),
  };
};

export default connect(
  null,
  mapDispatchProps,
  ({}, {panTo}, ownProps: {spot: Spot}) => ({panTo, spot: ownProps.spot}),
)(SideBarItem);
