import path from 'path';
import NodemonPlugin from 'nodemon-webpack-plugin';
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const isDevelopment = process.env.NODE_ENV !== 'production';
const mode = isDevelopment ? 'development' : 'production';

const __dirname = process.cwd();

const config = {
  mode,
  entry: {
    main: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: '[name]',
    libraryTarget: 'umd',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2024'
        },
        exclude: /node_modules/
      }
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new NodemonPlugin(),
    new ForkTsCheckerPlugin()
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.tsx', '.ts', '.js', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      root: path.resolve(__dirname),
      server: path.resolve(__dirname, 'src/server'),
    },
  }
};

export default config;
