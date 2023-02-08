// module.exports = (env) => {
//     console.log(env)
//     return {
//         mode: 'development', /* устанавливаем режим, по умолчанию стоит режим production, код более сжатый */
//     }
// }

const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};