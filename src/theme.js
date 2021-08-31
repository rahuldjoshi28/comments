const theme = {
  colors: {
    gray1: "#E0E0E0",
    gray2: "",

    white: "#F8F8F8",

    black1: "",
    black2: ""
  },
  breakpoints: {
    sm: 480,
    md: 768,
  },
};

const up = (breakpoint) => {
  return `@media (min-width: ${theme.breakpoints[breakpoint]}px)`;
};

const down = (breakpoint) => {
  return `@media (max-width: ${theme.breakpoints[breakpoint]}px)`;
};

export { up, down };

export default theme;
