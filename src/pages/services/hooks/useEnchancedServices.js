import { calcRank, calcIncomopleteCoefficient } from '../../../helpers/rank'

const INCOMPLETED_COEFFICIENT_TRESHOLD = 0.7

export default ({ serviceItems }) => {
  const enchancedServiceItems = serviceItems.map(serviceItem => {
    const { fakeReviews, feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank } = serviceItem;
    const rank = calcRank({
      fakeReviews,
      feedbackWithClientsDirection,
      forumReviewsDirection,
      sideServicesRank,
    });
    const incomopleteCoefficient = calcIncomopleteCoefficient({ feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank });
    const incomplete = incomopleteCoefficient <= INCOMPLETED_COEFFICIENT_TRESHOLD;
    return ({ ...serviceItem, rank, incomopleteCoefficient, incomplete });
  });

  return enchancedServiceItems;
}
