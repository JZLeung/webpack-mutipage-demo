module.exports = {
    plugins: [
        // minify css
        // require('cssnano')({
        //     preset: 'default'
        // }),
        // 处理css前缀
        require('autoprefixer')({
            browsers: [
                "> 1%",
                "last 2 versions",
                "ie >= 9"
            ]
        }),
        // 处理flex浏览器兼容性
        require('postcss-flexibility'),
        // 处理css中rgba颜色代码
        require('postcss-color-rgba-fallback'),
        // 处理css中opacity的IE兼容性。
        require('postcss-opacity'),
        require('cssnano')
    ]
}
