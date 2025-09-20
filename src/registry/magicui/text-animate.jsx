import React from "react";

// Simple TextAnimate component with a blur-in effect
export function TextAnimate({
  as: Tag = "span",
  animation = "blurIn",
  className = "",
  delay = 0,
  children,
  ...rest
}) {
  const style = {
    animationDelay: typeof delay === "number" ? `${delay}ms` : delay,
  };

  const animationClass = animation === "blurIn" ? "mui-animate-blur-in" : "";

  return (
    <Tag
      className={`${animationClass} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Deprecated stub after revert. Intentionally left blank.
export {};
