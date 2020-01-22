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
    zIndex: 200000,
    marginTop: 185,
    fontSize: 120,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: 'black'
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
    maxWidth: 1200,
    display: 'flex',
    width: '100%',
    margin: '50px auto 0'
  },
  contentSide: {
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
  listWrapper: { display: 'flex' },
  rankListWrapper: { alignSelf: 'flex-end' }
}
