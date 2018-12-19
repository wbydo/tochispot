import * as React from "react";

import { List, ListItem } from "react-toolbox/lib/list";
import { RootState } from "../state";

import SideBarItem from "../containers/sidebar_item";

type Props = RootState;

const SideBar = (props: Props) => {
  return(
    <List selectable={true}>
      {props.spots && props.spots.map((spot) => {
        return <ListItem itemContent={<SideBarItem spot={spot}/>} selectable={false} />;
      })}
    </List>
  );
};

export default SideBar;
