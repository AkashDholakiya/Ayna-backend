'use strict';

/**
 * publish router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::publish.publish');
