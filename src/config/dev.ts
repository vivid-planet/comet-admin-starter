import { IConfig } from "app/config/index";
import test from "app/config/test";

declare const CONFIG_DEV_LOCAL_EXISTS: boolean;

let config: IConfig = {
    ...test,
    apiUrl: "http://dev.example.com",
};

if (process.env.NODE_ENV !== "production") {
    const devLocal: IConfig = CONFIG_DEV_LOCAL_EXISTS ? require("app/config/dev.local").default : {};
    config = { ...config, ...devLocal };
}

export default config;
