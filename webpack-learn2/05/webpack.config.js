module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                   loader: 'babel-loader',
                   options: {
                        presets: [
                            ['babel-preset-env',{
                                targets: {
                                    //chrome: '52'
                                    browser: ['> 1%','last 2 versions']
                                }
                            }]
                        ]
                    }
                },
                exclude: '/node_modules/'
            }
        ]
    }
}