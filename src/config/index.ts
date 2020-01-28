export interface IConfig {
    apiUrl: string;
    apiUser: string;
    apiPassword: string;
}

export const defaultConfig: IConfig = {
    apiUrl: "https://www.example.com",
    apiUser: "",
    apiPassword: "",
};

export const getConfig = <K extends keyof IConfig>(key: K): IConfig[K] => {
    const c: IConfig = process.env.NODE_ENV !== "production" ? require("app/config/dev").default : defaultConfig;

    const extClientApiUrl = (window as any).EXTERNAL__APP_CLIENT_API_URL__;
    if (extClientApiUrl) {
        c.apiUrl = extClientApiUrl;
    }

    const extClientApiUser = (window as any).EXTERNAL__APP_CLIENT_API_USER__;
    if (extClientApiUser) {
        c.apiUser = extClientApiUser;
    }

    const extClientApiPassword = (window as any).EXTERNAL__APP_CLIENT_API_PASSWORD__;
    if (extClientApiPassword) {
        c.apiPassword = extClientApiPassword;
    }

    return c[key];
};
