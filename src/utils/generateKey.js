import React from "react";

export function generateKey(pre) {
  return `${pre}_${new Date().getTime()}`;
}
