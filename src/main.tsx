import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Wrapper from "./Wrapper.tsx";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>
);
