const path = require('path');

module.exports = {
  mode: 'development',
  entry: './script.js', // Chemin de votre fichier d'entrée principal
  output: {
    filename: 'main.js', // Le nom du fichier de sortie
    path: path.resolve(__dirname, 'dist'), // Le dossier de sortie
  },
};

