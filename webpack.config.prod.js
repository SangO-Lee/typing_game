const path = require('path');

module.exports = {
    mode: 'production',
    entry :{
        main: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: '[name].js',
    }
}