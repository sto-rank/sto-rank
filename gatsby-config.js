const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");


module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: "Services",
        // This is field under which it's accessible
        fieldName: "services",
        url: "https://stitch.mongodb.com/api/client/v2.0/app/services-zwfve/graphql",
        headers: {
          // Learn about environment variables: https://gatsby.app/env-vars
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
        createLink: (pluginOptions) => {
          return fetch('https://stitch.mongodb.com/api/client/v2.0/app/services-zwfve/auth/providers/anon-user/login', {
            method: 'POST',
          }).then(response => response.json()).then((response) => {
            const accessToken = response.access_token;

            const link = createHttpLink({
              uri: 'https://stitch.mongodb.com/api/client/v2.0/app/services-zwfve/graphql',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              fetch
            });

            return link;
          })
        },
      },
    },
    'gatsby-plugin-antd',
    'gatsby-plugin-emotion',
    'gatsby-plugin-extract-schema'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
