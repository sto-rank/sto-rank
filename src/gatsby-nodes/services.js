const path = require('path')

module.exports = async ({ graphql, actions: { createPage } }) => {
  // const servicesResult = await graphql(`
  //   {
  //     list {
  //       _id
  //       list {
  //         pagePath
  //       }
  //     }
  //   }
  // `)
  // if (servicesResult.errors) {
  //   console.error(servicesResult.errors)
  // }
  //
  // servicesResult.data.allServicesJson.edges.forEach(({ node }) => {
  //   createPage({
  //     path: node.pagePath,
  //     component: path.resolve(`src/templates/service/index.js`),
  //   })
  // })
}
