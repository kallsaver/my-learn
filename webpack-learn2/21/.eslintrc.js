
// 参考文献:https://blog.csdn.net/txl910514/article/details/76178988
// 下载eslint-config-standard的依赖包:
// https://www.npmjs.com/package/eslint-config-standard
// 修正方式报错的名字xxx   https://eslint.org/docs/rules/xxx
//"off"或者0    //关闭规则关闭
//"warn"或者1    //在打开的规则作为警告（不影响退出代码）
//"error"或者2    //把规则作为一个错误（退出代码触发时为1）

module.exports = {
    root: true,
    extends: "standard",
    // eslint-plugin-html等插件,省略eslint-plugin
    plugins: [
        'html'
    ],
    env: {
        browser: true,
        node: true,
    },
    // 不对以下全局变量进行no-undef检查
    globals: {
        define: true
    },
    rules: {
        // errorName: [warn, value]
        "indent": [2, 4],
        // 文件最后要换行
        "eol-last": [0],
        // 语句结尾不能带空格
        "no-trailing-spaces": [0]
    }
}
