"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const SUN_SVG = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent("#fff")}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`;

const MOON_SVG = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent("#fff")}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`;

const MaterialUISwitch = styled(Switch)(({}) => ({
  width: 64,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) !important",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(28px)",
      "& .MuiSwitch-thumb": {
        backgroundColor: "#1e293b",
        transform: "rotate(-360deg)",
        "&::before": {
          backgroundImage: MOON_SVG,
        },
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#475569",
      },
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.5,
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      opacity: 0.8,
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#89CFF0",
    width: 32,
    height: 32,
    transition:
      "background-color 500ms ease, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) !important",
    transform: "rotate(0deg)",
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "16px 16px",
      backgroundImage: SUN_SVG,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#e0f2fe",
    borderRadius: 34 / 2,
    transition: "background-color 500ms ease !important",
  },
}));

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <MaterialUISwitch
        sx={{ m: 1 }}
        checked={false}
        disabled
        inputProps={{ "aria-label": "Loading theme switch" }}
      />
    );
  }

  return (
    <MaterialUISwitch
      sx={{ m: 1 }}
      checked={isDark}
      onChange={handleThemeChange}
      inputProps={{ "aria-label": "Toggle theme" }}
    />
  );
};

export default ThemeSwitch;
