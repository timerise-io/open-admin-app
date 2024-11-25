import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body .w-md-editor {
    border-radius: 4px !important;
    box-shadow: none !important;
    border: 1px solid #D9D9D9 !important;
  }
  body .w-md-editor-toolbar {
    border-bottom: 1px solid #D9D9D9 !important;
  }
  body .w-md-editor-toolbar button {
    color: #333333 !important;
  }
  body .w-md-editor-area {
    border-radius: 4px !important;
}
  body .w-md-editor-text-pre > code,
  body .w-md-editor-text-input {
    font-size: ${({ theme }) => theme.typography.body.size};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
    color: #333333 !important;
  }
  body .w-md-editor-preview {
    padding: 10px !important;
    box-shadow: none !important;
    border-left: 1px solid #D9D9D9 !important;
    background-color: rgb(246, 246, 246) !important;
    border-radius: 0 0 4px 0; !important;
  }
  body .w-md-editor-preview .wmde-markdown {
    font-size: ${({ theme }) => theme.typography.body.size};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
    color: #333333 !important;
    background: none !important;
  }
`;

export default GlobalStyles;
