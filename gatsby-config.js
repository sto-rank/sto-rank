const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");


module.exports = {
  siteMetadata: {
    title: 'СТО Киева сепциализирующиеся на ремонте АКПП',
    siteUrl: `https://sto-rank.com`
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
    'gatsby-plugin-extract-schema',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        serialize: ({ site: { siteMetadata: { siteUrl } }, allSitePage }) => allSitePage.edges.map(({ node }) => {
          return {
            url: `${siteUrl}${node.path}`,
            changefreq: `weekly`,
            priority: 0.7,
          }
        })
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-41563578-7",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        defer: true,
      },
    },
  ],
}
