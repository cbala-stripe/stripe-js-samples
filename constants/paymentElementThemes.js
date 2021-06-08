export const DEFAULT = {
  rules: {
    "*": {
      fontWeight: "500",
      fontSize: "13px",
      lineHeight: "1.5",
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
    },
    ".Tab": {
      border: "none",
      borderRadius: "6px",
      padding: "10px 12px 8px 12px",
      color: "#727F96",
      boxShadow: "0 0 0 1px #e0e0e0",
      backgroundColor: "#ffffff",
      transition: "box-shadow 0.08s ease-in, border 0.08s ease-in",
    },
    ".Tab:focus": {
      outline: "none",
      boxShadow:
        "0 0 0 1px rgba(50, 151, 211, .3), 0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px rgba(50, 151, 211, 0.3)",
    },
    ".Tab:hover": {
      border: "none",
      color: "#727F96",
      boxShadow:
        "0 0 0 1px #e0e0e0, 0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 1px 1.5px 0 rgba(0, 0, 0, 0.05)",
    },
    ".Tab--selected, .Tab--selected:hover": {
      border: "none",
      boxShadow:
        "0 0 0 1.5px #0570DE, 0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 1px 1.5px 0 rgba(0, 0, 0, 0.05)",
    },
    ".Tab--selected:focus": {
      boxShadow:
        "0 0 0 1.5px #0570DE, 0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px rgba(50, 151, 211, 0.3)",
    },
    ".TabIcon--selected": {
      color: "#0570DE",
    },
    ".TabLabel--selected": {
      color: "#0570DE",
    },
    ".Input": {
      border: "none",
      fontSize: "13px",
      fontWeight: "400",
      lineHeight: "1.5",
      padding: "12px",
      borderRadius: "6px",
      boxShadow:
        "0 0 0 1px #e0e0e0, 0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 1px 1.5px 0 rgba(0, 0, 0, 0.05)",
    },
    ".Input:focus": {
      outline: "none",
      boxShadow:
        "0 0 0 1px rgba(50, 151, 211, .3), 0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px rgba(50, 151, 211, 0.3)",
    },
    ".Input::placeholder": {
      color: "#A3ACB9",
    },
    ".Label": {
      color: "#4F5B76",
    },
    ".Text": {
      color: "#4F5B76",
    },
    ".Text--redirect": {
      paddingTop: "24px",
      color: "#0570DE",
    },
  },
};
