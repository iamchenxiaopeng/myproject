module.exports = {
    proxy: {
        '/api': {
            target: 'http://47.101.179.39:443/',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
          }
    }
  }