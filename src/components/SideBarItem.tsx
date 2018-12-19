import * as React from "react";

import { Chip } from "react-toolbox/lib/chip";
import Link from "react-toolbox/lib/link";

import { Spot } from "../state";

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

export default SideBarItem;
