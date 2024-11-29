const path = require('path');

module.exports = {
  entry: './src/js/HomeMain.js',
  output: {
    path: path.resolve(__dirname, 'dist'),  // Dossier de sortie pour le bundle
    filename: 'bundle.js',  // Nom du fichier bundle
  },
  mode: 'development',
  devServer: {
    static: path.join(__dirname, './src'),
    port: 9000,
    open: true,
  },
};
