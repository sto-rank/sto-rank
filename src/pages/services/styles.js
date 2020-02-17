const HEADER_HEIGHT = 200;

export default {
  container: {
    flexDirection: 'row',
    display: 'flex',
    height: '100vh',
    paddingTop: HEADER_HEIGHT,
},
  services: {
    width: 'calc(50% - 40px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    overflow: 'auto',
  },
  map: {
    width: '50%',
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'fixed',
    backgroundColor: 'white',
    zIndex: 2222,
    left: 0,
    right: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 0,
  }
}
