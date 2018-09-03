module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                   loader: 'babel-loader',
                   options: {
                        // env指的就是babel-preset-env
                        presets: [
                            ['env',{
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