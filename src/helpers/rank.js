const MAX_RANK = 5;
const directionToRankMap = {
  '-1': 1,
  '0': 3,
  '1': 5
}
const booleanToRankMap = {
  'true': 5,
  'false': 1,
}

export const calcRank = ({ fakeReviews, feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank }) => {
  let rank = sideServicesRank.reduce((prev, next) => prev + next, 0) / sideServicesRank.length;
  rank += directionToRankMap[feedbackWithClientsDirection.toString()];
  rank += booleanToRankMap[fakeReviews.toString()];
  rank += directionToRankMap[forumReviewsDirection.toString()];

  return rank / 4;
};
export const rankToStatus = (rank) => {
  if (rank <= 3.5) return 'danger'
  if (rank <= 4.5) return 'warning'
  return 'safe'
}
