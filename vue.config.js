const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // 基本路径 vue-cli3.3+新版本使用 publicPath  vue-cli3.3以下版本使用baseUrl
    publicPath: "./",
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: "static",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,
    /* 代码保存时进行eslint检测 */
    lintOnSave: true,
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        open: true,
        host: '0.0.0.0',
        port: 8077,
        https: false,
        hotOnly: false,
        // before: require('./mock/mock-server.js')
        /* 使用代理 */
        proxy: {
            "/api": {
                target: "http://118.190.145.217:8120",
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false
            },
        }

    },
    // webpack 配置，键值对象时会合并配置，为方法时会改写配置
    // https://cli.vuejs.org/guide/webpack.html#simple-configuration
    configureWebpack: (config) => {
        // 简单/基础配置，比如引入一个新插件
        //生产and测试环境
        let pluginsPro = [
            //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
            new BundleAnalyzerPlugin(),
        ];
        //开发环境
        let pluginsDev = [
            // //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
            // new vConsolePlugin({
            //     filter: [], // 需要过滤的入口文件
            //     enable: true // 发布代码前记得改回 false
            // }),
        ];
        if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
            config.plugins = [...config.plugins, ...pluginsPro];
        } else {
            // 为开发环境修改配置...
            config.plugins = [...config.plugins, ...pluginsDev];
        }
    },
    chainWebpack: (config) => {
        // 链式配置
        config.resolve.alias.set('styles', resolve('src/assets/styles'))
            .set("@", resolve("src"))
        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()
    },
    // // css相关配置
    // css: {
    //     // 启用 CSS modules
    //     requireModuleExtension: true,
    //     // 是否使用css分离插件 ExtractTextPlugin
    //     extract: true,
    //     // 开启 CSS source maps?
    //     sourceMap: true,
    //     // css预设器配置项
    //     loaderOptions: {
    //         // sass: {
    //         //     //设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
    //         //     data: `
    // 		// 	$baseUrl: "/";
    // 		// 	@import '@/assets/scss/_common.scss';
    // 		// 	`
    //         // }

    //     },
    // },
    // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
    // pluginOptions: {
    //     'style-resources-loader': { //https://github.com/yenshih/style-resources-loader
    //         preProcessor: 'scss', //声明类型
    //         'patterns': [
    //             //path.resolve(__dirname, './src/assets/scss/_common.scss'), 
    //         ],
    //         //injector: 'append'
    //     }
    // }
}