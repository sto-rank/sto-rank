import { DARK_GRAY_COLOR, GREEN_COLOR, ORANGE_COLOR, RED_COLOR } from '../constants/colors'

export const MAX_RANK = 5;
const MIN_RANK = 1;
const MIN_REVIEWS_AMOUNT = 15;

const directionToRankMap = {
  '-1': 3,
  '0': MIN_RANK,
  '1': Math.round((MAX_RANK + MIN_RANK) / 2),
  '2': MAX_RANK
}
const booleanToRankMap = {
  'true': MAX_RANK,
  'false': MIN_RANK,
}
const requiredSideServicesRank = [
  'Vse STO',
  'Google Maps'
]

const getRequiredSideServicesRankNotFound = ({ sideServicesRank }) => {
  return requiredSideServicesRank.filter(o => !sideServicesRank.map(o => o.name).includes(o));
}

const isReviewsAmountTooLow = ({ sideServicesRank }) => {
  return !!sideServicesRank.find(({ reviewsAmount }) => reviewsAmount < MIN_REVIEWS_AMOUNT);
}

export const calcSolveCustomerClaimsPercentage = ({ percentage }) => {
  return percentage;
  let result = percentage / 50 * 100;
  if (result > 100) result = 100;

  return result;
}

export const calcRank = ({ website, fakeReviews, feedbackWithClientsDirection, forumReviewsDirection, solveCustomerClaimsPercentage, sideServicesRank }) => {
  let sideServicesRankFiltered = sideServicesRank.filter(o => o.rank != null);
  let parameterCount = sideServicesRankFiltered.length;

  let rank = sideServicesRankFiltered.map(o => parseInt(o.rank)).reduce((prev, next) => prev + next, 0);

  if (solveCustomerClaimsPercentage !== -1) {
    let percentage = calcSolveCustomerClaimsPercentage({ percentage: solveCustomerClaimsPercentage });

    rank += MAX_RANK * ((percentage || 1) / 100);
    parameterCount++;
  }

  // if (forumReviewsDirection !== -1) {
  //   rank += directionToRankMap[forumReviewsDirection.toString()];
  //   parameterCount++
  // }

  const requiredSideServicesRankNotFound = getRequiredSideServicesRankNotFound({ sideServicesRank: sideServicesRankFiltered });
  if (requiredSideServicesRankNotFound.length < requiredSideServicesRank.length) {
    rank += booleanToRankMap[(!fakeReviews).toString()];
  } else {
    rank += directionToRankMap['-1'];
  }
  parameterCount++;

  return (rank / parameterCount).toFixed(1);
};
export const rankToStatus = (rank) => {
  if (rank <= 3.5) return 'danger'
  if (rank <= 4.5) return 'warning'
  return 'safe'
}

export const rankToColor = (rank) => {
  if (rank === null) return DARK_GRAY_COLOR
  if (rank < 3.5) return RED_COLOR
  if (rank < 4.3) return ORANGE_COLOR
  return GREEN_COLOR
}

export const calcIncomopleteCoefficient = ({ feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank }) => {
  let incomopleteCoefficient = 1;
  const requiredSideServicesRankNotFound = getRequiredSideServicesRankNotFound({ sideServicesRank });

  if (requiredSideServicesRankNotFound) {
    incomopleteCoefficient -= 0.1 * requiredSideServicesRankNotFound.length
  }

  if (feedbackWithClientsDirection === -1) {
    incomopleteCoefficient -= 0.1;
  }

  const reviewsAmountTooLow = isReviewsAmountTooLow({ sideServicesRank });

  if (reviewsAmountTooLow) {
    incomopleteCoefficient -= 0.2;
  }

  // if (forumReviewsDirection === -1) {
  //   incomopleteCoefficient -= 0.1;
  // }

  return incomopleteCoefficient
}
