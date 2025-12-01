module.exports = {
  apps: [{
    name: 'kenos-website',
    script: './dist/server.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PAYLOAD_CONFIG_PATH: './dist/payload.config.js'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
