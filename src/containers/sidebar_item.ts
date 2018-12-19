import { Dispatch } from "redux";
import { connect } from "react-redux";

import SideBarItem from "../components/SideBarItem";
import { Spot, actions } from "../state";

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
