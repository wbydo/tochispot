import * as React from "react";

import { List, ListItem } from "react-toolbox/lib/list";
import { Chip } from "react-toolbox/lib/chip";
import Link from "react-toolbox/lib/link";

interface Spot {
  name: string;
  genres: string[];
}

interface Props {
  spots: Spot[] | null;
}

const itemContent = (spot: Spot) => {
  const {name, genres} = spot;
  return (
    <div>
      <a href="#">{name}</a>
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

const SideBar = (props: Props) => {
  return(
    <List selectable={true}>
      {props.spots && props.spots.map((spot: Spot) => <ListItem itemContent={itemContent(spot)} selectable={false} />)}
    </List>
  );
};

export default SideBar;
