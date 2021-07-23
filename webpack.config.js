const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Get the package version
const PACKAGE = require('./package.json');
const version = PACKAGE.version;

module.exports = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    let config = {
        entry: './src/index.ts',
        output: {
            filename: `lib-${version}.js`,
            path: isEnvDevelopment ? path.resolve(__dirname, 'public') : path.resolve(__dirname, 'lib'),
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            port: 3000,
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
    };

    if (isEnvProduction) {
        config.plugins = [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'lib')],
            }),
        ];
    }

    return config;
};
