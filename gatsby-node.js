/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const serviceConfig = require('./src/gatsby-nodes/services')

exports.createPages = async ({ actions, graphql }) => {
  await serviceConfig({ graphql, actions });
  const { createRedirect } = actions;

  // await createRedirect({
  //   fromPath: `/`,
  //   toPath: `/services`,
  //   redirectInBrowser: true,
  //   isPermanent: true,
  // })
}
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  // Make the front page match everything client side.
  // Normally your paths should be a bit more judicious.
  if (page.path.match(/^\/services/)) {
    page.matchPath = "/services/*"
    createPage(page)
  }
}
