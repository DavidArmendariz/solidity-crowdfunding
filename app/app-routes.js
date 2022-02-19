const routes = require('next-routes-extended')();

routes.add('/campaigns/new', '/campaigns/new');
routes.add('/campaigns/:address', '/campaigns/show');

module.exports = routes;
