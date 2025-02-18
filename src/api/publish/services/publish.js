'use strict';

/**
 * publish service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::publish.publish');
