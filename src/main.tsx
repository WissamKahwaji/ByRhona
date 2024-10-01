import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Wrapper from "./Wrapper.tsx";
import "./i18n.ts";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>
);
