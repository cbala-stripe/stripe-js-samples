import type {
  CssFontSource,
  CustomFontSource,
  Appearance,
} from "@stripe/stripe-js";

export type AppearanceOption = {
  label: string;
  backgroundColor: string;
  appearance: Appearance;
  fonts: Array<CssFontSource | CustomFontSource>;
};

export const APPEARANCE_OPTIONS: AppearanceOption[] = [
  {
    label: "Stripe",
    backgroundColor: "#fff",
    fonts: [],
    appearance: {},
  },
  {
    label: "Night",
    backgroundColor: "#222",
    fonts: [],
    appearance: {
      theme: "night",
    },
  },
  {
    label: "Flat",
    backgroundColor: "#fff",
    fonts: [],
    appearance: {
      theme: "flat",
    },
  },
  {
    label: "None",
    backgroundColor: "#fff",
    fonts: [],
    appearance: {
      theme: "none",
    },
  },
  {
    label: "Floating",
    backgroundColor: "#fff",
    fonts: [],
    appearance: {
      labels: "floating",
    },
  },
  {
    label: "VT323",
    backgroundColor: "#111111",
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css2?family=VT323&display=swap",
      },
    ],
    appearance: {
      theme: "none",
      variables: {
        fontFamily: "VT323",
        fontSizeBase: "18px",
        colorText: "orange",
        colorTextSecondary: "orange",
        borderRadius: "0px",
        colorLogo: "dark",
        colorBackground: "#111",
        spacingUnit: "3px",
        colorIcon: "orange",
        colorIconTabSelected: "#111",
      },
      labels: "floating",
      rules: {
        ".Label--floating": {
          transition: "all .3s steps(2, jump-both)",
        },
        ".Input, .Block, .Tab": {
          border: "1px solid orange",
        },
        ".Tab": {
          fontWeight: "normal",
        },
        ".Tab--selected, .Tab:hover": {
          backgroundColor: "orange",
          color: "#111",
        },
        ".Tab:focus, .Input:focus": {
          outline: "solid orange",
        },
      },
    },
  },
  {
    label: "Ninety Five",
    backgroundColor: "#c1c9d2",
    fonts: [],
    appearance: {
      theme: "none",
      variables: {
        fontFamily: "Verdana",
        fontLineHeight: "1.5",
        borderRadius: "0",
        colorBackground: "#dfdfdf",
        fontSizeBase: "14px",
      },
      rules: {
        ".Input": {
          backgroundColor: "#ffffff",
          boxShadow:
            "inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080",
        },
        ".Input--invalid": {
          color: "#DF1B41",
        },
        ".Tab, .Block": {
          boxShadow:
            "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
        },
        ".Tab:hover": {
          backgroundColor: "#eee",
        },
        ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
          backgroundColor: "#ccc",
        },
      },
    },
  },
  {
    label: "Dark Blue",
    backgroundColor: "#0C2E4E",
    fonts: [],
    appearance: {
      theme: "none",
      variables: {
        fontFamily: "Sohne, system-ui, sans-serif",
        fontSizeBase: "14px",
        fontWeightNormal: "500",
        borderRadius: "8px",
        colorPrimary: "#FFCE48",
        colorText: "white",
        colorTextSecondary: "white",
        colorTextPlaceholder: "#727F96",
        colorIconTab: "white",
        colorIconTabSelected: "#1A1B25",
        colorLogo: "dark",
      },
      rules: {
        ".Tab": {
          backgroundColor: "#0A2540",
        },
        ".Tab--selected": {
          backgroundColor: "#FFCE48",
          color: "#1A1B25",
        },
        ".Input": {
          backgroundColor: "transparent",
          border: "1.5px solid #FFCE48",
        },
      },
    },
  },
  {
    label: "Bubblegum",
    backgroundColor: "#F8E1F5",
    fonts: [],
    appearance: {
      theme: "none",
      variables: {
        fontSizeBase: "14px",
        fontWeightNormal: "500",
        borderRadius: "2px",
        colorIconTabSelected: "white",
        spacingGridRow: "15px",
      },
      rules: {
        ".Label": {
          marginBottom: "6px",
        },
        ".Tab, .Input": {
          boxShadow: "0px 3px 10px rgba(18, 42, 66, 0.08)",
        },
        ".Tab--selected": {
          backgroundColor: "#DF1B41",
          color: "white",
        },
      },
    },
  },
];

export const PAYMENT_ELEMENT_BETA_1_THEMES: AppearanceOption[] = [
  {
    label: "Default",
    backgroundColor: "#fff",
    fonts: [],
    appearance: {},
  },
  {
    label: "Stripe ",
    backgroundColor: "#fff",
    fonts: [],
    appearance: {
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
    },
  },
  {
    label: "Bubblegum ",
    backgroundColor: "#fce0f6",
    fonts: [],
    appearance: {
      // @ts-expect-error
      rowGap: "15px",
      rules: {
        "*": {
          fontWeight: "400",
          fontSize: "13px",
          lineHeight: "1.5",
        },
        ".Tab": {
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 3px 10px rgba(18, 42, 66, 0.08)",
          borderRadius: "2px",
          padding: "8px 12px",
          border: "none",
        },
        ".Tab:hover": {
          border: "none",
          borderRadius: "2px",
          boxShadow:
            "4px 4px 8px rgba(0, 0, 0, 0.08), 0px 3px 7px rgba(18, 42, 66, 0.04)",
        },
        ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
          backgroundColor: "#DF1B41",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "2px",
          boxShadow:
            "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
        },
        ".TabIcon--selected": {
          fill: "#FFFFFF",
        },
        ".Label": {
          color: "#1A1B25",
          fontWeight: "500",
        },
        ".Input": {
          borderRadius: "2px",
          boxShadow: "0px 3px 10px rgba(18, 42, 66, 0.08)",
          border: "none",
          padding: "12px",
        },
        ".Input:focus": {
          outline: "none",
          boxShadow:
            "0 0 0 1px rgba(236, 180, 205, .3), 0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 4px rgba(50, 151, 211, 0.3)",
        },
        ".Input--invalid, .Error": {
          color: "#DF1B41",
        },
        ".Text": {
          color: "#7180c4",
        },
      },
    },
  },
  {
    label: "Dark ",
    backgroundColor: "#1a1f36",
    fonts: [],
    appearance: {
      // @ts-expect-error
      columnGap: "15px",
      rules: {
        "*": {
          fontSize: "14px",
          lineHeight: "1.5",
        },
        ".Tab": {
          borderRadius: "16px",
          backgroundColor: "#6A7383",
          padding: "10px 12px 8px 12px",
          color: "rgba(255, 255, 255, .75)",
          border: "none",
          transition: "box-shadow 0.08s ease-in, border 0.08s ease-in",
          fontWeight: "300",
        },
        ".Tab:hover": {
          border: "none",
          backgroundColor: "#505b6d",
          color: "#fff",
        },
        ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
          backgroundColor: "#85D996",
          color: "#000",
          fontWeight: "400",
        },
        ".TabIcon": {
          fill: "#fff",
        },
        ".TabIcon.TabIcon--selected": {
          fill: "#000",
        },
        ".Input": {
          color: "#fff",
          borderRadius: "24px",
          backgroundColor: "#1a1f36",
          borderColor: "#727983",
          borderWidth: "2px",
          padding: "12px",
        },
        ".Input:focus": {
          outline: "none",
          boxShadow:
            "0 0 0 2px rgb(206 199 222), 0 1px 1px 0 rgb(0 0 0), 0 0 0 4px rgb(50 151 211)",
        },
        ".Input--invalid": {
          color: "#DF1B41",
        },
        ".Label": {
          color: "#fff",
          fontWeight: "300",
        },
        ".Text": {
          color: "#85D996",
        },
      },
    },
  },
  {
    label: "Minimal ",
    backgroundColor: "#fff",
    fonts: [],
    appearance: {
      // @ts-expect-error
      rowGap: "10px",
      columnGap: "5px",
      rules: {
        "*": {
          fontFamily: ' "Gill Sans", sans-serif',
          fontSize: "14px",
          lineHeight: "1.5",
        },
        ".Tab": {
          backgroundColor: "#F6F8FA",
          padding: "10px 12px 8px 12px",
          borderRadius: "10px",
          border: "none",
          color: "#6A7383",
        },
        ".Tab:hover": {
          border: "none",
          boxShadow:
            "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
        },
        ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
          border: "none",
          backgroundColor: "#fff",
          boxShadow:
            "0 0 0 1.5px #262626, 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
          color: "#262626",
        },
        ".Label": {
          fontWeight: "500",
        },
        ".Input": {
          fontSize: "16px",
          backgroundColor: "#F6F8FA",
          borderRadius: "10px",
          border: "none",
        },
        ".Input:disabled, .Input--invalid:disabled": {
          color: "lightgray",
        },
      },
    },
  },
  {
    label: "Ninety Five ",
    backgroundColor: "#c1c9d2",
    fonts: [],
    appearance: {
      // @ts-expect-error
      rowGap: "10px",
      columnGap: "5px",
      rules: {
        "*": {
          fontFamily: "Verdana",
          lineHeight: "1.5",
        },
        ".Input": {
          backgroundColor: "#ffffff",
          boxShadow:
            "inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080",
        },
        ".Input--invalid": {
          color: "#DF1B41",
        },
        ".Tab": {
          border: "none",
          backgroundColor: "#dfdfdf",
          padding: "10px 12px 8px 12px",
          boxShadow:
            "inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
        },
        ".Tab:hover": {
          backgroundColor: "#eee",
          border: "none",
        },
        ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
          backgroundColor: "#ccc",
          border: "none",
        },
      },
    },
  },
];
