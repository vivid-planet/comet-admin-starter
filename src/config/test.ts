import { IConfig } from "app/config/index";
import production from "app/config/production";

const config: IConfig = {
    ...production,
    apiUrl: "http://test.example.com",
};

export default config;
