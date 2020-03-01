import { GREEN_COLOR, ORANGE_COLOR } from '../../constants/colors'

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
    width: '60%',
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
    display: 'inline-block',
    color: 'rgba(0, 0, 0, 0.85)',
    marginBottom: 0,
  },
  actionsBlock: {
    textAlign: 'left',
    width: '100%',
  },
  listBlock: {
    width: '40%',
    boxSizing: 'border-box',
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'column'
  },
  listSeparator: {
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  infoText: {
    fontWeight: 'bold',
    maxWidth: 300,
    alignSelf: 'flex-end',
    fontSize: 12,
  },
  warningText: {
    color: ORANGE_COLOR,
  },
  successText: {
    color: GREEN_COLOR,
  },
}
