import "app/globals";
import "material-design-icons/iconfont/material-icons.css";
import "typeface-open-sans";

import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { MasterLayout, MuiThemeProvider, RouterBrowserRouter } from "@comet/admin";
import config from "app/config";
import Dashboard from "app/pages/Dashboard";
import theme from "app/theme";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { Redirect, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import comet_admin_messages_de from "../lang/comet-admin/de.json";
import comet_admin_messages_en from "../lang/comet-admin/en.json";
import MasterHeader from "./components/MasterHeader";
import MasterMenu from "./components/MasterMenu";

const cometAdminMessages = {
    en: comet_admin_messages_de,
    de: comet_admin_messages_en,
};

const cache = new InMemoryCache();
const link = ApolloLink.from([
    new HttpLink({
        uri: `${config.API_URL}/api/graphql`,
        // credentials: "include",
        headers: {
            "x-vivid-auth": `Basic ${btoa(`${config.API_USER}:${config.API_PASSWORD}`)}`,
        },
    }),
]);

const client = new ApolloClient({
    link,
    cache,
});

const GlobalStyle = createGlobalStyle`
    body  {
        margin: 0;
    }
`;

class App extends React.Component {
    public static render(baseEl: Element) {
        ReactDOM.render(<App />, baseEl);
    }

    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <IntlProvider locale="de" messages={cometAdminMessages["de"]}>
                    <RouterBrowserRouter>
                        <ApolloProvider client={client}>
                            <React.Fragment>
                                <GlobalStyle />
                                <MasterLayout headerComponent={MasterHeader} menuComponent={MasterMenu}>
                                    <Switch>
                                        <Route path="/dashboard" component={Dashboard} />
                                        <Redirect from="/" to="/dashboard" />
                                    </Switch>
                                </MasterLayout>
                            </React.Fragment>
                        </ApolloProvider>
                    </RouterBrowserRouter>
                </IntlProvider>
            </MuiThemeProvider>
        );
    }
}
export default App;
