const path = require('path')

module.exports = async ({ graphql, actions: { createPage } }) => {
  const servicesResult = await graphql(`
   {
      allServicesJson {
        edges {
          node {
            name
            pagePath
            coordinates
          }
        }
      }
    }
  `)
  if (servicesResult.errors) {
    console.error(servicesResult.errors)
  }

  servicesResult.data.allServicesJson.edges.forEach(({ node }) => {
    createPage({
      path: node.pagePath,
      component: path.resolve(`${__dirname}/index.js`),
    })
  })
}
