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
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    {
      resolve: "gatsby-source-graphql-universal",
      options: {
        // This type will contain remote schema Query type
        typeName: "allServicesJson",
        // This is field under which it's accessible
        fieldName: "allServicesJson",
        url: "https://stitch.mongodb.com/api/client/v2.0/app/services-zwfve/graphql",
        headers: {
          // Learn about environment variables: https://gatsby.app/env-vars
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
        createLink: (pluginOptions) => {
          const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODc1MTY5MDcsImlhdCI6MTU4NzUxNTEwNywiaXNzIjoiNWU5ZjhlZTNjNGIwOWRiMGVlMDRjMzYyIiwic3RpdGNoX2RldklkIjoiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwic3RpdGNoX2RvbWFpbklkIjoiNWU5ZjgyMGE0YzliYTNlMDYxMDMyZDk0Iiwic3ViIjoiNWU5ZjhlZTNjNGIwOWRiMGVlMDRjMzVjIiwidHlwIjoiYWNjZXNzIn0.Ie5Wx3z2oKvPnxx2MnkTchlhrdM4RCxA53lEO23TnFg'

          return createHttpLink({
            uri: 'https://stitch.mongodb.com/api/client/v2.0/app/services-zwfve/graphql',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            fetch
          })
        },
      },
    },
    'gatsby-plugin-antd',
    'gatsby-plugin-emotion',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
