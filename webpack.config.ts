// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');
// const FileManagerPlugin = require('filemanager-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FileManagerPlugin from "filemanager-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import 'webpack-dev-server'
import path from 'path';
import {Configuration} from 'webpack';

const config: Configuration= {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.[contenthash].js',
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),

    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('icons', '[name].[contenthash].[ext]'),
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'template.html'),
            filename: 'index.html',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['build']
                },
                onEnd: {
                    copy: [
                        {
                            source: path.join( 'src', 'static'),
                            destination: 'build'
                        }
                    ]
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        })
    ],
    devServer: {
        watchFiles: path.resolve(__dirname, 'src'),
        port: 9000,
    }
}

export default config;