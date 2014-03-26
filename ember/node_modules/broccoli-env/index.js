exports.getEnv = function () {
  var env = process.env.BROCCOLI_ENV || 'development'
  if (env !== 'production' && env !== 'development') {
    throw new Error('Environment set to "' + env + '", but only BROCCOLI_ENV=production and BROCCOLI_ENV=development are supported at the moment')
  }
  return env
}
