import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import * as fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

import environment from "./src/environment";

interface IEnvironment {
    production: boolean;
}

const config = ({ production }: IEnvironment): webpack.Configuration => {
    const publicPath = "/";

    const plugins = [
        new webpack.DefinePlugin({
            CONFIG_DEV_LOCAL_EXISTS: fs.existsSync(path.resolve(__dirname, "src/config/dev.local.ts")),
        }),
        new HtmlWebpackPlugin({
            template: "public/index.ejs",
            templateParameters: {
                environmentValues: environment.map(env => ({ key: env, value: production ? `$${env}` : process.env[env] })),
            },
            hash: true,
        }),
    ];
    if (production) {
        plugins.push(
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify("production"),
            }),
        );
    } else {
        plugins.push(
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: "./src/**/*.{ts,tsx,js,jsx,json,css,scss,md}",
                },
            }),
        );
    }

    return {
        mode: production ? "production" : "development",
        entry: {
            "comet-admin-starter": ["./src/polyfills.ts", "./src/pre-loader.ts", "./src/loader.ts"],
        },
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    loader: "file-loader",
                    options: {
                        outputPath: "files/",
                        name: "[name].[ext]",
                    },
                },
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: require.resolve("babel-loader"),
                    options: {
                        customize: require.resolve("babel-preset-react-app/webpack-overrides"),
                        babelrc: false,
                        configFile: false,
                        presets: [require.resolve("babel-preset-react-app")],
                        plugins: [
                            [
                                require.resolve("babel-plugin-styled-components"),
                                {
                                    displayName: !production,
                                    fileName: !production,
                                },
                            ],
                        ],
                        cacheDirectory: true,
                    },
                },
                {
                    test: /\.(js|mjs)$/,
                    exclude: /@babel(?:\/|\\{1,2})runtime/,
                    loader: require.resolve("babel-loader"),
                    options: {
                        babelrc: false,
                        configFile: false,
                        compact: false,
                        presets: [[require.resolve("babel-preset-react-app/dependencies"), { helpers: true }]],
                        cacheDirectory: true,
                        sourceMaps: false,
                    },
                },
                {
                    test: /\.css?$/,
                    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
                },
            ],
        },
        plugins,
        optimization: {
            sideEffects: true,
            usedExports: true,
        },
        resolve: {
            modules: ["node_modules"],
            descriptionFiles: ["package.json"],
            mainFields: ["browser", "module", "main"],
            extensions: ["*", ".mjs", ".js", ".jsx", ".ts", ".tsx"],
            alias: {
                app: path.resolve(__dirname, "src/"),
            },
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].js",
            chunkFilename: "[id].chunk.js?v=[chunkhash]",
            publicPath,
        },
        devServer: {
            contentBase: __dirname,
            host: "0.0.0.0",
            port: 8080,
            historyApiFallback: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        },
    };
};

export default config;
