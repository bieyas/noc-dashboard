module.exports.mtxConfig = {
  host: process.env.MIKROTIK_HOST, // Router IP address
  username: process.env.MIKROTIK_USER, // Username
  password: process.env.MIKROTIK_PASS, // Password
  port: process.env.MIKROTIK_PORT, // API port (8729 for TLS)
  tls: false, // TLS encryption
  //   timeout: 10000, // Connection timeout (ms)
  debug: true, // Debug output
};
