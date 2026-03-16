export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  serverOrigin: process.env.SERVER_ORIGIN || 'http://localhost:3000',
  database: {
    useSqlite: process.env.USE_SQLITE !== 'false',
    sqlitePath: process.env.DATABASE_SQLITE_PATH || 'schedley.sqlite',
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'schedley',
    ssl: process.env.DATABASE_SSL || 'false',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'change-me-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl:
      process.env.GOOGLE_CALLBACK_URL ||
      'http://localhost:3000/api/auth/google/callback',
  },
  frontend: {
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  },
});
