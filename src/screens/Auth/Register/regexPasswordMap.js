export const REGEX_PASSWORD_MAP = {
  NONE: null,
  LETTER_NUMBER: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$/,
  LETTER_NUMBER_SPECIAL: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$/,
  UPPER_LOWER_NUMBER: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]$/,
  UPPER_LOWER_NUMBER_SPECIAL: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/,
};
