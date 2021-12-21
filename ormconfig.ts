import { ConnectionOptions } from 'typeorm';

// When running using `ts-node` (e.g. component/e2e tests or typeorm migration) the code is not compiled to `dist` folder so we can use the `src` folder for entities and migration
// to know that we need to use the `src` folder we use:
// - the global variable '__NEED_TO_USE_SRC__' when using jest (we set it in the config file)
// - env variable (we set it in package.json).
// We aren't using 'dist' as when running the tests, the code doesn't compile to 'dist'
// If not running under those types of test we need to use the 'dist' as using `dist` would fix the error `SyntaxError: Cannot use import statement outside a module`
const baseFolder = 'src';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 54320,

  // 'database' must be set in TypeORM
  database: process.env.DATABASE_NAME || 'playground',

  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',

  entities: [`${baseFolder}/**/*.entity.{ts,js}`],

  migrations: [`${baseFolder}/migrations/*.{ts,js}`],

  migrationsRun: true,

  cli: {
    migrationsDir: 'src/migrations',
    // entitiesDir: "src/entity",
    subscribersDir: 'src/subscriber',
  },

  synchronize: true,
};
export default config;
