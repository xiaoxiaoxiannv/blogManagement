const path = require('path')

const { defineConfig } = require('@vue/cli-service')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// 获取当前版本号
process.env.VUE_APP_VERSION = require('./package.json').version

// 生产环境配置
// 不参与打包的文件，需要使用CDN
const externals = []
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL, // 项目部署地址
  productionSourceMap: true, // 生产环境不生成资源映射map文件
  lintOnSave:true,
  configureWebpack: {
    entry: {
      app: './src/main.ts'
    },
    output: {
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[contenthash].js'
    },
    externals: externals,
    plugins: []
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.resolve(__dirname, './src/style/var/index.less')}";`
          }
        }
      }
    }
  },
  devServer: {
    port: '1310',
    proxy: {
      '/blog': {
        target: 'http://101.132.131.220:10000', // yu
        changeOrigin: true // 用于控制请求头中的host值
      }
    }
  },
  chainWebpack: (config) => {
    // 路径别称
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('#', resolve('types'))
    config.resolve.alias.set('&', resolve('mock'))
    // vue-i18n配置
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
    // svg-sprite-loader配置
    config.module.rule('svg').exclude.add(resolve('src/assets/svg')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  pluginOptions: {}
})
