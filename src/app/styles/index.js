import { createGlobalStyle } from "styled-components";

import { normalizeStyles } from "./normalize";

export const GlobalStyles = createGlobalStyle`
  ${normalizeStyles}
  .MuiList-root {
    &::after {
      height: 100%;
      content: none;
    }
  }
`;
