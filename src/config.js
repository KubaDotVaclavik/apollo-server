export default {
  dbConnectionString: process.env.DB_CONNECTION_STRING,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  sessionName: process.env.SESSION_NAME,
  sessionSecret: process.env.SESSION_SECRET,
  isProduction: process.env.NODE_ENV === 'production'
}
