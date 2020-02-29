export const MAX_RANK = 5;
const MIN_RANK = 1;
const directionToRankMap = {
  '-1': 3,
  '0': 1,
  '1': 3,
  '2': 5
}
const booleanToRankMap = {
  'true': MAX_RANK,
  'false': MIN_RANK,
}
const requiredSideServicesRank = [
  'Vse Sto',
  'Google Maps'
]

const getRequiredSideServicesRankNotFound = ({ sideServicesRank }) => {
  return requiredSideServicesRank.filter(o => !sideServicesRank.map(o => o.name).includes(o));
}

export const calcRank = ({ fakeReviews, feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank }) => {
  let parameterCount = sideServicesRank.length;

  let rank = sideServicesRank.map(o => o.rank).reduce((prev, next) => prev + next, 0);

  const requiredSideServicesRankNotFound = getRequiredSideServicesRankNotFound({ sideServicesRank });

  if (feedbackWithClientsDirection !== -1) {
    rank += directionToRankMap[feedbackWithClientsDirection.toString()];
    parameterCount++
  }

  if (feedbackWithClientsDirection !== -1) {
    rank += directionToRankMap[forumReviewsDirection.toString()];
    parameterCount++
  }

  if (requiredSideServicesRankNotFound.length < requiredSideServicesRank.length) {
    rank += booleanToRankMap[(!fakeReviews).toString()];
  } else {
    rank += directionToRankMap['-1'];
  }
  parameterCount++

  return (rank / parameterCount).toFixed(1);
};
export const rankToStatus = (rank) => {
  if (rank <= 3.5) return 'danger'
  if (rank <= 4.5) return 'warning'
  return 'safe'
}

export const rankToColor = (rank) => {
  if (rank < 3.5) return 'red'
  if (rank < 4.3) return '#FF7F50'
  return '#00804f'
}

export const calcIncomopleteCoefficient = ({ feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank }) => {
  let incomopleteCoefficient = 1;
  const requiredSideServicesRankNotFound = getRequiredSideServicesRankNotFound({ sideServicesRank });

  if (requiredSideServicesRankNotFound) {
    incomopleteCoefficient -= 0.1 * requiredSideServicesRankNotFound.length
  }

  if (feedbackWithClientsDirection === -1) {
    incomopleteCoefficient -= 0.2;
  }
  if (forumReviewsDirection === -1) {
    incomopleteCoefficient -= 0.1;
  }

  return incomopleteCoefficient
}
