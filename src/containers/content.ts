import { Dispatch } from "redux";
import { connect } from "react-redux";

import { init } from "../state/actions";
import Content from "../components/Content";

const mapDispatchProps = (dispatch: Dispatch) => {
  return {
    init: () => dispatch(init()),
  };
};

export default connect(null, mapDispatchProps)(Content);
