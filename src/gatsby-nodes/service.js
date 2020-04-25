const path = require('path')

module.exports = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      services {
        services {
          pagePath
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors)
  }

  const services = result.data.services.services;

  services.forEach(({ pagePath }) => {
    createPage({
      path: pagePath,
      component: path.resolve(`src/templates/service/index.js`),
    })
  })
}
