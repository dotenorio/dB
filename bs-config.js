module.exports = {
  port: 8080,
  logLevel: 'silent',
  files: ['./**/*.{html,htm,css,js}'],
  server: {
    baseDir: './',
    middleware: {
      0: null
    }
  }
}
