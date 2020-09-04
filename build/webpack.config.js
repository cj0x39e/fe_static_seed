const path = require('path')
const ejs = require('ejs');

module.exports = {
  mode: 'development',
  entry: path.resolve('./views/test/test.entry.js'),

  module: {
    rules: [
      {
        test: /\.(html|ejs)$/i,
        use: [
          'file-loader?name=[name].[ext]',
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              // preprocessor: (content, loaderContext) => {
              //   let result;
    
              //   try {
              //     result = ejs.render(content, {
              //       // inject data
              //       root: path.resolve('./ui-components/')
              //     });
              //   } catch (error) {
              //     loaderContext.emitError(error);
    
              //     return content;
              //   }
    
              //   return result;
              // },
            }
          },
          // {
          //   loader: 'ejs-html-loader',
          //   options: {
          //     title: 'The Naked Ant',
          //     // variable: 'data'
          //   }
          // }
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'file-loader?name=[name].css',
          'extract-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },

  output: {
    filename: 'index.js',
    path: path.resolve('./dist'),
    /* IMPORTANT!
     * You must compile to UMD or CommonJS
     * so it can be required in a Node context: */
    libraryTarget: 'umd'
  },

  // watch: true
};