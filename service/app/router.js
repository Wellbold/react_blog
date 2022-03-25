'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  require('./router/fronted')(app);
  require('./router/admin')(app);
};
