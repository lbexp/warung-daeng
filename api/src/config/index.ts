import { env } from 'process';

const CONFIG = () => ({
  database: {
    username: env.DB_USERNAME || '',
    password: env.DB_PASSWORD || '',
    name: env.DB_NAME || '',
    host: env.DB_HOST || '',
    port: parseInt(env.DB_PORT || '5432', 10),
    ssl: env.DB_SSL === 'true',
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
  bcrypt: {
    salt: parseInt(env.BCRYPT_SALT, 10),
  },
});

export default CONFIG;
