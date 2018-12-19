import * as React from "react";
import AppBar from "react-toolbox/lib/app_bar";

import Content from "./containers/content";

const App = () => {
  return(
    <div id="App">
      <AppBar
          title="とちすぽっと！（β版）"
          fixed={true}
          scrollHide={true}
          flat={true}
          />
      <Content />
    </div>
  );
};

export default App;
