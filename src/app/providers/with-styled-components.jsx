import { GlobalStyles } from "@app/styles";
import { ThemeProvider } from "styled-components";

const theme = {
    fontFamily: "Roboto",
    mainPrimary: "#1976D2",
};
export const withStyledComponents =
    (component) => () => {
        return (
            <ThemeProvider theme={theme}>
                {component()}
                <GlobalStyles />
            </ThemeProvider>
        );
    };
