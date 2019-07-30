import { Toolbar } from "@material-ui/core";
import { RouterBrowserRouter } from "@vivid-planet/react-admin-core";
import { LocaleContext } from "@vivid-planet/react-admin-date-fns";
import { createGlobalStyle, MuiThemeProvider } from "@vivid-planet/react-admin-mui";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import Master from "app/components/Master";
import { getConfig } from "app/config";
import "app/globals";
import Dashboard from "app/pages/Dashboard";
import theme from "app/theme";
import * as dateFnsLocaleDe from "date-fns/locale/de";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import * as ReactDOM from "react-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import * as Webfontloader from "webfontloader";

const cache = new InMemoryCache();
const stateLink = withClientState({
    cache,
    resolvers: {},
});
const link = ApolloLink.from([
    stateLink,
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
                        <ApolloHooksProvider client={client}>
                            <LocaleContext.Provider value={dateFnsLocaleDe}>
                                <React.Fragment>
                                    <GlobalStyle />
                                    <Master>
                                        <Toolbar style={{ margin: "6px 0" }} />
                                        <Switch>
                                            <Route path="/dashboard" component={Dashboard} />
                                            <Redirect from="/" to="/dashboard" />
                                        </Switch>
                                    </Master>
                                </React.Fragment>
                            </LocaleContext.Provider>
                        </ApolloHooksProvider>
                    </ApolloProvider>
                </RouterBrowserRouter>
            </MuiThemeProvider>
        );
    }
}
export default App;
