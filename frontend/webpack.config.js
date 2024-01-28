const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvPlugin = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const dotenvPath = path.resolve(process.env.DOTENV_CONFIG_PATH);
const dotenv = require('dotenv');
const env = dotenv.config({ path: dotenvPath }).parsed;


const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';


const config = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/[name].[contenthash].js',
        clean: true
    },
    devServer: {
        open: true,
        host: env.CLIENT_HOST,
        port: env.CLIENT_PORT
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new DotenvPlugin({
            path: dotenvPath
        }),
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(
                `http://${env.API_HOST}${env.API_PORT.length ? ':' + env.API_PORT : ''}${env.API_URL_PREFIX}/`
            )
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all'
                }
            }
        }
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'styles/[name].[contenthash].css'
            })
        );
    } else {
        config.mode = 'development';
    }

    return config;
};
