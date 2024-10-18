module.exports = {
  devServer: {
    proxy: {
      '/configurations': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
}