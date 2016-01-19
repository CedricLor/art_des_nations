const webpack = require('webpack');
const path = require('path');

module.exports = {
  // the project dir
  context: __dirname,
  // context: './webpack/',
  entry: {
    index: ['jquery', 'jquery-ujs', './index.js']
  },

  devtool: 'source-map',

  output: {
    path: path.resolve("./app/assets/javascripts/"),
    filename: "redux_bundle.js"
  },

  module: {
    loaders: [
      {test: require.resolve('jquery'), loader: 'expose?jQuery'},
      {test: require.resolve('jquery'), loader: 'expose?$'},
      {
        test: /\.js|\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },

      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      dumb_components: path.resolve("./webpack/reactredux/components/dumb_components"),
      news_shared_components: path.resolve("./webpack/reactredux/components/news_index_page/shared_components"),
      plugins: path.resolve("./webpack/plugins")
    }
  }
}
// // webpack.config.js

// "use strict";

// var path = require('path');
// var config = module.exports = {};

// config.context = __dirname;

// // Specify your entries, I store all my webpack managed JavaScript in
// // app/webpack, as per my earlier requirements.
// config.entry = {
//   index: './index.js'
// };

// // This outputs an entry named 'foobar' into
// // app/assets/javascripts/entries/foobar.js.
// config.output = {
//   path: path.join(__dirname, "app/assets/javascripts/redux_bundle"),
//   filename: "[name].js"
// }

// // Use babel-loader for our *.js files.
// config.module = {
//   // externals: {
//   //   jquery: "var jQuery"
//   // },
//   loaders: [
//     { test: /\.js$/,
//       exclude: /node_modules/,
//       loaders: ["babel"]
//     },
//     // { test: require.resolve('jquery'), loader: 'expose?jQuery' },
//     // { test: require.resolve('jquery'), loader: 'expose?$' },
//   ]
// }


// // #############################
// // #############################
// // #############################
// // From tutorial React_on_rails / shakacode
// // https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client/webpack.client.base.config.js
// // #############################
// const webpack = require('webpack');
// const path = require('path');
// const autoprefixer = require('autoprefixer');

// const devBuild = process.env.NODE_ENV !== 'production';
// const nodeEnv = devBuild ? 'development' : 'production';

// module.exports = {

//   // the project dir
//   context: __dirname,
//   entry: {

//     // See use of 'vendor' in the CommonsChunkPlugin inclusion below.
//     vendor: [
//       'babel-polyfill',
//       'jquery',
//     ],

//     // This will contain the app entry points defined by webpack.hot.config and webpack.rails.config
//     app: [
//       './app/bundles/comments/startup/clientRegistration',
//     ],
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx'],
//     alias: {
//       libs: path.join(process.cwd(), 'app', 'libs'),
//       react: path.resolve('./node_modules/react'),
//       'react-dom': path.resolve('./node_modules/react-dom'),
//     },
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify(nodeEnv),
//       },
//     }),

//     // https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
//     new webpack.optimize.CommonsChunkPlugin({

//       // This name 'vendor' ties into the entry definition
//       name: 'vendor',

//       // We don't want the default vendor.js name
//       filename: 'vendor-bundle.js',

//       // Passing Infinity just creates the commons chunk, but moves no modules into it.
//       // In other words, we only put what's in the vendor entry definition in vendor-bundle.js
//       minChunks: Infinity,
//     }),
//   ],
//   module: {
//     loaders: [
//       { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
//       { test: /\.(ttf|eot)$/, loader: 'file' },
//       { test: /\.(jpe?g|png|gif|svg|ico)$/, loader: 'url?limit=10000' },

//       { test: require.resolve('jquery'), loader: 'expose?jQuery' },
//       { test: require.resolve('jquery'), loader: 'expose?$' },

//       // Use one of these to serve jQuery for Bootstrap scripts:

//       // Bootstrap 3
//       { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },

//       // Bootstrap 4
//       { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
//     ],
//   },

//   // Place here all postCSS plugins here, so postcss-loader will apply them
//   postcss: [autoprefixer],

//   // Place here all SASS files with variables, mixins etc.
//   // And sass-resources-loader will load them in every CSS Module (SASS file) for you
//   // (so don't need to @import them explicitly)
//   // https://github.com/shakacode/sass-resources-loader
//   sassResources: ['./app/assets/styles/app-variables.scss'],

// };


// #############################
// #############################
// #############################
// From tutorial React_on_rails / shakacode
// https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client/webpack.client.rails.build.config.js
// #############################
// const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const config = require('./webpack.client.base.config');

// const devBuild = process.env.NODE_ENV !== 'production';

// config.output = {
//   filename: '[name]-bundle.js',
//   path: '../app/assets/webpack',
// };

// // You can add entry points specific to rails here
// config.entry.vendor.unshift(
//   'es5-shim/es5-shim',
//   'es5-shim/es5-sham',
//   'jquery-ujs',

//   // Configures extractStyles to be true if NODE_ENV is production
//   'bootstrap-loader/extractStyles'
// );



// // See webpack.common.config for adding modules common to both the webpack dev server and rails

// config.module.loaders.push(
//   {
//     test: /\.jsx?$/,
//     loader: 'babel-loader',
//     exclude: /node_modules/,
//   },
//   {
//     test: /\.css$/,
//     loader: ExtractTextPlugin.extract(
//       'style',
//       'css?minimize&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]' +
//       '!postcss'
//     ),
//   },
//   {
//     test: /\.scss$/,
//     loader: ExtractTextPlugin.extract(
//       'style',
//       'css?minimize&modules&importLoaders=3&localIdentName=[name]__[local]__[hash:base64:5]' +
//       '!postcss' +
//       '!sass' +
//       '!sass-resources'
//     ),
//   },
//   {
//     test: require.resolve('react'),
//     loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham',
//   },
//   {
//     test: require.resolve('jquery-ujs'),
//     loader: 'imports?jQuery=jquery',
//   }
// );

// config.plugins.push(
//   new ExtractTextPlugin('[name]-bundle.css', { allChunks: true }),
//   new webpack.optimize.DedupePlugin()
// );

// if (devBuild) {
//   console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
//   config.devtool = 'eval-source-map';
// } else {
//   console.log('Webpack production build for Rails'); // eslint-disable-line no-console
// }

// module.exports = config;
