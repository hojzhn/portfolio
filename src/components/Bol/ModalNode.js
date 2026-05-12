import React from "react";
import { BaseNodeShell } from "./BaseNodeShell";

export function ModalNode(props) {
  return (
    <BaseNodeShell
      {...props}
      rounded={true}
      collapsible={true}
      className="diagram-node--modal"
    />
  );
}
