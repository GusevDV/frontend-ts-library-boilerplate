const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    let config = {
        entry: './src/index.ts',
        output: {
            filename: `dist.js`,
            path: path.resolve(__dirname, 'dist'),
            library: 'Multifon',
            libraryTarget: 'umd',
            libraryExport: 'default',
        },
        devServer: {
            static: path.resolve(__dirname, 'dist'),
            port: 3000,
            hot: true,
            open: true
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')],
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './index.html'),
                inject: 'head',
                filename: 'index.html',
                hash: true,
            })
        ],
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                        }
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        target: ['web', 'es2015'],
    };

    return config;
};
