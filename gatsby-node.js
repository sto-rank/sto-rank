/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const serviceConfig = require('./src/gatsby-nodes/services')

exports.createPages = async ({ actions, graphql }) => {
  await serviceConfig({ graphql, actions })
}
