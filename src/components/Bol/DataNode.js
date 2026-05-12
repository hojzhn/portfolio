import React from "react";
import { BaseNodeShell } from "./BaseNodeShell";

export function DataNode(props) {
  return (
    <BaseNodeShell
      {...props}
      variant="data"
      collapsible={false}
      compact={true}
    />
  );
}
