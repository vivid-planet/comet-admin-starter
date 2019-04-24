import { createMuiTheme } from "@material-ui/core";

/* tslint:disable:interface-name */
declare module "@material-ui/core/styles/createMuiTheme" {
    interface Theme {
        appDrawer: {
            width: React.CSSProperties["width"];
        };
    }

    interface ThemeOptions {
        appDrawer?: {
            width?: React.CSSProperties["width"];
        };
    }
}
/* tslint:enable:interface-name */

export default createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: '"Open Sans", sans-serif',
        h5: {
            fontSize: "18px",
            lineHeight: "24px",
            fontWeight: "bold",
        },
    },
    palette: {
        text: {
            primary: "#17181a",
            secondary: "#3180b3",
        },
        primary: {
            main: "#0081b8",
            50: "#e3f7fc",
            100: "#c8f0fa",
            200: "#abe5f5",
            300: "#85dcf2",
            400: "#49d0f2",
            500: "#00b4ef",
            600: "#2db1e0",
            700: "#0093cc",
            800: "#0081b8",
            900: "#004b73",
        },
        secondary: {
            main: "#fecc51",
            50: "#fff8e2",
            100: "#ffecb5",
            200: "#ffe084",
            300: "#ffd551",
            400: "#fecc51",
            500: "#ffc216",
            600: "#ffb410",
            700: "#ffa113",
            800: "#ff9115",
            900: "#ff710b",
        },
        error: {
            main: "#cc3314",
        },
    },
    props: {
        MuiToolbar: {
            variant: "dense",
        },
        MuiListItem: {
            dense: true,
        },
        MuiTable: {
            padding: "dense",
        },
    },
    appDrawer: {
        width: 300,
    },
});
