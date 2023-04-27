import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

export default function useBreakpoint(value: number | Breakpoint) {
  const theme = useTheme();
  const isDown = useMediaQuery(theme.breakpoints.down(value));
  return isDown;

}
