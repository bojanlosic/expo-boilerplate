import { colors } from "..";
export default (color, theme = "default") => {
  const themeColor = colors[theme][color];
  const fallbackColor = colors.default[color];
  return themeColor || fallbackColor;
};
