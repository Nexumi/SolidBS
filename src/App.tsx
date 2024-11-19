import type { Component } from 'solid-js';

import { Router } from "@solidjs/router";
import Root from "./Root";

const App: Component = () => {
  return (
    <Router>
      <Root />
    </Router>
  );
};

export default App;