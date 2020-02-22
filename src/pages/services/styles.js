const HEADER_HEIGHT = 200;

export default {
  container: {
    flexDirection: 'row',
    display: 'flex',
    height: '100vh',
},
  services: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    overflow: 'auto',
  },
  map: {
    width: '50%',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: 'white',
    zIndex: 2222,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 0,
  },
  actionsBlock: {
    textAlign: 'left',
    width: '100%',
  },
  listBlock: {
    boxSizing: 'border-box',
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'column'
  }
}
