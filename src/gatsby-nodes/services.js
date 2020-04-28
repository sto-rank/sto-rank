const path = require('path')

module.exports = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      services {
        services {
          specialized
          specialties
          pagePath
          name
          description
          website
          points {
            address
            title
            phones
            coordinates
            workingHours {
              day
              time {
                from
                to
              }
            }
          }
          sideServicesRank {
            name
            link
            rank
            reviewsAmount
          }
          fakeReviews
          feedbackWithClientsDirection
          solveCustomerClaimsPercentage
          forumReviewsDirection
          sideForumsMentions {
            link
            textNodes {
              messages
              text
            }
          }
          rank
          incomplete
        }
      }
    }
  `)
  if (result.errors) {
    console.error(result.errors)
  }

  const allServices = result.data.services.services;

  const completedServices = allServices
    .filter(o => !o.incomplete)
    .sort((a, b) => {
      return b.rank - a.rank
    });
  const incompleteServices = allServices
    .filter(o => o.incomplete)
    .sort((a, b) => {
      return b.rank - a.rank
    });

  const services = [ ...completedServices, ...incompleteServices ].filter(o => o.sideServicesRank.length);

  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(services.length / itemsPerPage);

  Array.from({ length: numberOfPages }).forEach((o, i) => {
    const currentPage = i + 1;
    const skip = i * itemsPerPage;

    const pageSuffix = i === 0 ? '' : `/${currentPage}`;

    const data = {
      services,
    };

    createPage({
      path: `/kyiv/remont-akpp${pageSuffix}`,
      component: path.resolve(`src/templates/services/index.js`),
      context: {
        limit: itemsPerPage,
        skip,
        numPages: numberOfPages,
        requestedPage: currentPage,
        data,
      },
    })
  });
}
