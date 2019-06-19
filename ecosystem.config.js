module.exports = {
  apps: [
    {
      name: 'treelab-client-app',
      script: 'yarn start',
      watch: true,
      exec_mode: 'fork_mode',
      env: {
        PORT: 4000,
        NODE_ENV: 'development',
      },
      env_staging: {
        PORT: 4000,
        NODE_ENV: 'staging',
      },
      env_production: {
        PORT: 4000,
        NODE_ENV: 'production yarn build',
      },
    },
  ],
};
