export const MAX_RANK = 5;
const MIN_RANK = 1;
const directionToRankMap = {
  '0': 1,
  '1': 3,
  '2': 5
}
const booleanToRankMap = {
  'true': MAX_RANK,
  'false': MIN_RANK,
}

export const calcRank = ({ fakeReviews, feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank }) => {
  let parameterCount = sideServicesRank.length;

  let rank = sideServicesRank.reduce((prev, next) => prev + next, 0);

  if (feedbackWithClientsDirection !== -1) {
    rank += directionToRankMap[feedbackWithClientsDirection.toString()];
    parameterCount++
  }
  if (forumReviewsDirection !== -1) {
    rank += directionToRankMap[forumReviewsDirection.toString()];
    parameterCount++
  }

  rank += booleanToRankMap[(!fakeReviews).toString()];
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
  if (rank < 4.3) return 'orange'
  return 'green'
}
