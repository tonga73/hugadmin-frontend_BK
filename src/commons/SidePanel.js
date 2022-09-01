import React from "react";

export function SidePanel({ children }: { children: ReactNode }) {
  return <div className="h-full flex flex-col gap-y-1.5">{children}</div>;
}
