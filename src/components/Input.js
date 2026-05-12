import React from "react";

export default function Input({
  placeholder,
  color = "var(--txt)",
  type = "text",
  className = "",
  ...props
}) {
  const sharedStyles = {
    backgroundColor: "transparent",
    letterSpacing: "1px",
    color,
  };

  const sharedClasses = `border px-2 py-1 text-sm ${className}`;

  if (type === "textarea") {
    return (
      <textarea
        className={sharedClasses}
        style={sharedStyles}
        placeholder={placeholder}
        {...props}
      />
    );
  }

  return (
    <input
      type={type}
      className={sharedClasses}
      style={sharedStyles}
      placeholder={placeholder}
      {...props}
    />
  );
}
