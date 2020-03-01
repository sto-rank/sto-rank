const MAX_WIDTH = 1200;

export default {
  container: {
    flexDirection: 'column',
    display: 'flex',
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  header: {
    position: 'relative',
    zIndex: 200000,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    display: 'inline-block',
    zIndex: 200000,
    marginTop: 280,
    fontSize: 50,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  titleText: {
    maxWidth: MAX_WIDTH,
    display: 'inline-block',
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    zIndex: 100000,
    opacity: .2,
  },
  content: {
    maxWidth: MAX_WIDTH,
    display: 'flex',
    width: '100%',
    margin: '100px auto 0'
  },
  contentSide: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    width: '50%',
  },
  rankBlock: {
    textAlign: 'right',
  },
  rankLabel: {
    fontSize: '16px',
  },
  rankValue: {
    marginTop: 10,
    fontSize: '20px',
    display: 'block'
  },
  listWrapper: { display: 'flex', flexDirection: 'column' },
  rankListWrapper: { alignSelf: 'flex-end' },
  listItemWithoutBorder: { border: 'none', margin: 0 },
  listWithoutBorder: {
    marginBottom: 20,
  },
  addressBlock: {
    marginBottom: 20,
  },
  specialtiesBlock: {
    marginTop: 20,
  },
  ourRatingTitleStyle: {
    fontSize: 25,
    verticalAlign: -3,
  },
  ourRatingValueStyle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textUnderTable: {
    fontWeight: 'bold',
    maxWidth: 300,
    alignSelf: 'flex-end',
    color: 'orange'
  },
  goBack: {
    marginBottom: 50,
    display: 'inline-block'
  }
}
