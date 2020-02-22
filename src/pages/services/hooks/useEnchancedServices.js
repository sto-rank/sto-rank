import { calcRank } from '../../../helpers/rank'

export default ({ serviceItems, filterSorting: { specialized, search } = {} }) => {
  return serviceItems.map(serviceItem => {
    const { fakeReviews, feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank } = serviceItem;
    const rank = calcRank({
      fakeReviews,
      feedbackWithClientsDirection,
      forumReviewsDirection,
      sideServicesRank: sideServicesRank.map(o => o.rank),
    });
    return ({ ...serviceItem, rank });
  })
    .filter(o => {
      return (
        !specialized || o.specialized.includes('TRANSMISSION_REPAIR')
      ) && (
        !search || o.name.toLowerCase().includes(search.toLowerCase())
      )
    })
    .sort((a, b) => b.rank - a.rank)
}
