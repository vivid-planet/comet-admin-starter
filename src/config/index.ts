import production from "app/config/production";
import test from "app/config/test";

export interface IConfig {
    apiBaseUrl: string;
    apiToken: string;
    apiUrl: string;
    apiUser: string;
    apiPassword: string;
}

interface IConfigSections {
    production: IConfig;
    test: IConfig;
    dev?: IConfig;
}

const config: IConfigSections = {
    production: { ...production },
    test: { ...test },
};

if (process.env.NODE_ENV !== "production") {
    const dev = require("app/config/dev").default;
    config.dev = { ...dev };
}

type Environments = "production" | "test" | "dev";
export const getConfig = <K extends keyof IConfig>(key: K): IConfig[K] => {
    const section: Environments = config[(window as any).__REACT_ADMIN_STARTER_ENV__ as Environments]
        ? (window as any).__REACT_ADMIN_STARTER_ENV__
        : "production";
    const c = config[section];
    if (!c) throw new Error("Unknown config section");
    return c[key];
};
