/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const serviceConfig = require('./src/templates/service/gatsby-node')

exports.createPages = async ({ actions, graphql }) => {
  await serviceConfig({ graphql, actions })
}
