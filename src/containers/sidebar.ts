import { connect } from "react-redux";

import SideBar from "../components/SideBar";
import { RootState } from "../state/reducers";

const mapStateProps = (state: RootState) => {
  return {
    spots: state.spots,
  };
};

export default connect(mapStateProps)(SideBar);
