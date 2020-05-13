const path = require('path')

const NOT_SERVICES = [
  'ad-oil.com.ua',
  'carservice.biz.ua',
  'autobooking.com',
  'offroadmaster.com',
  'akpp-remont.kiev.ua',
  'volvo.com.ua',
  'lacetti.com.ua'
]

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

  const allServices = result.data.services.services.filter(o => !NOT_SERVICES.includes(o.website));

  const completedServices = allServices
    .filter(o => !o.incomplete)
    .sort((a, b) => {
      if (b.rank !== a.rank) return b.rank - a.rank

      const aReviewsAmount = a.sideServicesRank.reduce((prev, next) => prev + next.reviewsAmount, 0);
      const bReviewsAmount = b.sideServicesRank.reduce((prev, next) => prev + next.reviewsAmount, 0);

      return bReviewsAmount - aReviewsAmount;
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
