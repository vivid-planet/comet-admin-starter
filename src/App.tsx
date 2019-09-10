import { ApolloProvider } from "@apollo/react-common";
import { RouterBrowserRouter } from "@vivid-planet/react-admin-core";
import { LocaleContext } from "@vivid-planet/react-admin-date-fns";
import { createGlobalStyle, MuiThemeProvider } from "@vivid-planet/react-admin-mui";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import * as sc from "app/App.sc";
import Master from "app/components/Master";
import { getConfig } from "app/config";
import "app/globals";
import Dashboard from "app/pages/Dashboard";
import theme from "app/theme";
import { de as dateFnsLocaleDe } from "date-fns/locale";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import * as Webfontloader from "webfontloader";

const cache = new InMemoryCache();
const link = ApolloLink.from([
    new HttpLink({
        uri: `${getConfig("apiUrl")}/api/graphql`,
        // credentials: "include",
        headers: {
            "x-vivid-auth": `Basic ${btoa(`${getConfig("apiUser")}:${getConfig("apiPassword")}`)}`,
        },
    }),
]);

const client = new ApolloClient({
    link,
    cache,
});

const GlobalStyle = createGlobalStyle`
  html,body,#page {
        margin: 0;
        padding: 0;
    }
`;

class App extends React.Component {
    public static render(baseEl: Element) {
        Webfontloader.load({
            google: {
                families: ["Open Sans", "Material Icons"],
            },
        });

        ReactDOM.render(<App />, baseEl);
    }

    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <RouterBrowserRouter>
                    <ApolloProvider client={client}>
                        <LocaleContext.Provider value={dateFnsLocaleDe}>
                            <React.Fragment>
                                <GlobalStyle />
                                <Master>
                                    <sc.Toolbar />
                                    <Switch>
                                        <Route path="/dashboard" component={Dashboard} />
                                        <Redirect from="/" to="/dashboard" />
                                    </Switch>
                                </Master>
                            </React.Fragment>
                        </LocaleContext.Provider>
                    </ApolloProvider>
                </RouterBrowserRouter>
            </MuiThemeProvider>
        );
    }
}
export default App;
