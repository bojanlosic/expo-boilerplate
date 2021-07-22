export const REGEX_EMAIL_MAP = {
  NONE: null,
  BASIC: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  COMPLEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
};