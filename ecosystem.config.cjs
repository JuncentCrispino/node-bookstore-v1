module.exports = {
  apps: [{
    name: 'bookstore_node',
    script: 'src/index.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};