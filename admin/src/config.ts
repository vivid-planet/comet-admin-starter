import environment from "./environment";

const config: { [key in typeof environment[number]]: string } = environment.reduce((ret: any, value) => {
    ret[value] = (window as any)[`EXTERNAL__${value}__`];
    return ret;
}, {});

export default config;
