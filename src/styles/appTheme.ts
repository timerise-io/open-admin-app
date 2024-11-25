import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  themeType: "LIGHT",

  spacing: "8px",

  borderRadius: "4px",

  colors: {
    error: "#EA4335",
    success: "#34A853",
    warning: "#FE852F",
    primary: "#333333",
    secondary: "#999999",
  },

  colorSchemas: {
    background: {
      primary: {
        color: "#F6F6F6",
      },
      secondary: {
        color: "#FFFFFF",
      },
    },
    input: {
      background: "#FFFFFF",
      border: "#D9D9D9",
      borderHover: "#999999",
    },
    button: {
      primary: {
        background: "#333333",
        backgroundActive: "#1A1A1A",
        backgroundDisabled: "#B8B8B8",
        text: "#FFFFFF",
        textDisabled: "#E5E5E5",
        shadowActive: "0px 1px 2px rgba(0, 0, 0, 0.28)",
        shadow: "0px 1px 2px rgba(0, 0, 0, 0.28)",
      },
      secondary: {
        background: "#FFFFFF",
        backgroundActive: "#FFFFFF",
        backgroundDisabled: "#FFFFFF",
        text: "#333333",
        textDisabled: "#B7B7B7",
        shadowActive: "0px 1px 2px rgba(0, 0, 0, 0.28)",
        shadow: "0px 1px 2px rgba(0, 0, 0, 0.08)",
      },
      danger: {
        background: "#FEF6F5",
        backgroundActive: "#FEF6F5",
        backgroundDisabled: "#FEF6F5",
        text: "#EA4335",
        textDisabled: "#F4A099",
        shadowActive: "0px 1px 2px rgba(234, 67, 53, 0.36)",
        shadow: "0px 1px 2px rgba(0, 0, 0, 0.08)",
      },
      positive: {
        background: "#F5FBF6",
        backgroundActive: "#F5FBF6",
        backgroundDisabled: "#f5fbf6",
        text: "#267D3D",
        textDisabled: "#9ec6a8",
        shadowActive: "0px 2px 3px rgba(38, 125, 61, 0.36)",
        shadow: "0px 1px 2px rgba(52, 168, 83, 0.16)",
      },
    },
  },

  typography: {
    h1: {
      size: "1.25rem",
      weight: "700",
      lineHeight: "1.625rem",
    },
    h2: {
      size: "1.125rem",
      weight: "700",
      lineHeight: "1.5rem",
    },
    h3: {
      size: "0.9375rem",
      weight: "700",
      lineHeight: "1.125rem",
    },
    body: {
      size: "0.8125rem",
      weight: "400",
      lineHeight: "1.25rem",
    },
    label: {
      size: "0.6875rem",
      weight: "400",
      lineHeight: "0.8125rem",
    },
    label_bold: {
      size: "0.8125rem",
      weight: "700",
      lineHeight: "1.25rem",
    },
  },
};
export const darkTheme: DefaultTheme = { ...lightTheme, themeType: "DARK" };
