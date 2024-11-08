module.exports = {
  devServer: {
    proxy: {
      '/configurations': {
        target: 'http://localhost:' + process.env.VUE_APP_PORT,
        changeOrigin: true,
      },
    },
  },
}