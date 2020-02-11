import { defaultConfig, IConfig } from "app/config/index";

declare const CONFIG_DEV_LOCAL_EXISTS: boolean;

let config: IConfig = {
    ...defaultConfig,
    // override default-values for development here
};

const devLocal: IConfig = CONFIG_DEV_LOCAL_EXISTS ? require("app/config/dev.local").default : {};
config = { ...config, ...devLocal };

export default config;
