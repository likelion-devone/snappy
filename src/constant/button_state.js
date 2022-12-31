/**
 * @enum {string}
 */
const DEFAULT_BUTTON_STATE = {
  DISABLED: "disabled",
  ABLED: "abled",
};

/**
 * @enum {string}
 */
const LARGE_BUTTON_STATE = {
  ...DEFAULT_BUTTON_STATE,
  ACTIVATED: "activated",
};

/**
 * @enum {string}
 */
const X_SMALL_BUTTON_STATE = {
  ...DEFAULT_BUTTON_STATE,
  ACTIVATED: "activated",
};

/**
 * @enum {string}
 */
export const BUTTON_STATE = {
  X_LARGE: DEFAULT_BUTTON_STATE,
  LARGE_34: LARGE_BUTTON_STATE,
  LARGE_44: DEFAULT_BUTTON_STATE,
  MEDIUM: DEFAULT_BUTTON_STATE,
  SMALL: DEFAULT_BUTTON_STATE,
  X_SMALL: X_SMALL_BUTTON_STATE,
};
