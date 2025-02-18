'use strict';

/**
 * publish controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::publish.publish');
