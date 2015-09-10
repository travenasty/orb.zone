// This config script, is intended to abstract away the fetching of these custom values.
// But for now, its fine to just have them hard-coded and configured at your own risk.

module.exports = {
  redisStore: {
    host: "127.0.0.1", // Server hostname
    port: "6379", // Server port number
    socket: "", // Server unix_socket
    ttl: 86400, // Session TTL (expiration) in seconds
    disableTTL:  false, // disables setting TTL, keys will stay until evicted (overrides ttl)
    db: 1, // Database index to use
    pass: '', // Password for Redis authentication
    prefix: 'sess:' // Key prefix defaulting to "sess:"
  },
  sess: {
    secret: "happy friendly childrens",
    resave: true, // ?
    saveUninitialized: true // ?
  }
}
