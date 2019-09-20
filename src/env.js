export default ({
    development: {
      baseURL: 'http://localhost:3000'
    },
    production: {
      baseURL: 'http://localhost:3000'
    }
  })[process.env.NODE_ENV]