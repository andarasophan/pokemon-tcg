module.exports = {
  // always import variable in every sass file
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/sass/_variables.scss";'
      }
    }
  },
  // replace htmlWebpackPlugin.options.title
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Pokemon'
        return args
      })
  }
}
