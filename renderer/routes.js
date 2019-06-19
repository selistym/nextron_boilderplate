const nextRoutes = require('next-routes');

const routes = nextRoutes();
routes
  .add('login', '/login')
  .add('styleguide', '/styleguide')
  .add('settings', '/settings/workspace/:workspaceId', 'settings')
  // Cores variation. Probably is a better way to do this.
  .add('empty', '/', 'cores')
  .add('cores', '/cores', 'cores')
  .add('coresWithWorkspace', '/cores/:workspaceId', 'cores')
  // Core variation
  .add('core', '/core/:workspaceId/:coreId', 'core')
  .add('coreWithTable', '/core/:workspaceId/:coreId/:tableId', 'core')
  .add('coreWithTableAndView', '/core/:workspaceId/:coreId/:tableId/:viewId', 'core');

module.exports = routes;
