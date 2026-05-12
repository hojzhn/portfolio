import React from "react";
import { BaseNodeShell } from "./BaseNodeShell";

export function CardNode(props) {
  return <BaseNodeShell {...props} rounded={false} collapsible={false} />;
}
