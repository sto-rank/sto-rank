/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const serviceConfig = require('./src/gatsby-nodes/service')
const servicesConfig = require('./src/gatsby-nodes/services')

exports.createPages = async ({ actions, graphql }) => {
  await serviceConfig({ graphql, actions });
  await servicesConfig({ graphql, actions });
}
// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage } = actions
//   // Make the front page match everything client side.
//   // Normally your paths should be a bit more judicious.
//   const str = `[A-Za-z0-9\-\_]+`;
//   const result = page.path.match(new RegExp(`^/${str}/${str}[/${str}]?`))
//   if (result) {
//     page.matchPath = result[0];
//     createPage(page)
//   }
// }
