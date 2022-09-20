import React, { useEffect } from "react";
import { useTheme } from "react-daisyui";
import { themeChange } from "theme-change";

import SelectThemeButton from "./Button";

const DEFAULT_THEMES = [
  "light",
  "dark",
  "cupcake",
  "bunblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
];

export default function Themes() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xl font-bold opacity-50">THEMES</div>
      <div className="flex flex-wrap gap-4">
        {DEFAULT_THEMES.map((t, i) => {
          return (
            <SelectThemeButton
              key={`theme_${t}_#${i}`}
              theme={t}
              selectTheme={t}
              text={t}
              role="button"
            >
              {t}
            </SelectThemeButton>
          );
        })}
      </div>
    </div>
  );
}
