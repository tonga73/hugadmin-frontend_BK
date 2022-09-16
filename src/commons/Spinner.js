import React from "react";

export default function Spinner() {
  return (
    <div className="h-full flex justify-center items-center">
      <div
        className="radial-progress animate-spin opacity-50"
        style={{ "--value": 70 }}
      ></div>
    </div>
  );
}
