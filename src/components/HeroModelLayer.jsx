import React, { forwardRef } from "react";
import { DesktopModel } from "./DesktopModel";

export const HeroModelLayer = forwardRef(function HeroModelLayer(_, ref) {
  return (
    <div
      ref={ref}
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
    >
      <DesktopModel />
    </div>
  );
});
