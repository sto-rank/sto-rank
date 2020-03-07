import { css } from '@emotion/core'
import { BLUE_COLOR, GREEN_COLOR, ORANGE_COLOR } from '../../../constants/colors'
import { MOBILE_DEVICE_LAYOUT_TRASHOLD } from '../../../constants/layout'

export default {
  label: {
    fontWeight: 'bold',
  },
  listItemWithoutBorder: {
    border: 'none',
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 10,
  },
  line: {
    marginBottom: 20,
  },
  questionWarning: {
    fontSize: 50,
    color: 'gray',
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
  rankBlock: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  detailsBtn: {
    color: BLUE_COLOR,
    fontWeight: 'bold',
    padding: 5,
    width: '100%',
  },
  cardHeadLink: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    cursor: 'pointer',
  },
  cardTitle: css`
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      font-size: 18px;
    }
  `,
  contactBtn: css`
    font-weight: bold;
  `,
}
