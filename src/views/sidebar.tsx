import * as React from "react";
import { connect } from "react-redux";
import { List, ListItem } from "react-toolbox/lib/list";

import SideBarItem from "./sidebar_item";

import { RootState } from "../state";

type Props = RootState;

const mapStateProps = (state: RootState) => {
  return {
    spots: state.spots,
  };
};

const SideBar = (props: Props) => {
  return(
    <List selectable={true}>
      {props.spots && props.spots.filter((spot) => spot.visible).map((spot) => {
        return <ListItem itemContent={<SideBarItem spot={spot}/>} selectable={false} />;
      })}
    </List>
  );
};

export default connect(mapStateProps)(SideBar);
