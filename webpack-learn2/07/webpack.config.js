module.exports = {
    entry: {
        'app': './src/app.ts'
    },
    output: {
        filename: './dist/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                }
            }
        ]
    }
}