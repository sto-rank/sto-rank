import { css } from '@emotion/core'

import { GRAY_COLOR, ORANGE_COLOR } from '../../constants/colors'
import { MOBILE_DEVICE_LAYOUT_TRASHOLD } from '../../constants/layout'

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
  title: css`
    display: inline-block;
    z-index: 200000;
    margin-top: 280px;
    font-size: 50px;
    text-transform: capitalize;
    text-align: center;
    color: black;
    font-weight: bold;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      font-size: 25px;
      padding: 0 10px;
      padding-bottom: 40px;
      line-height: 30px;
    }
  `,
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
  content: css`
    position: relative;
    max-width: ${MAX_WIDTH}px;
    display: flex;
    width: 100%;
    margin: 100px auto 0;
    flex-direction: row-reverse;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      flex-direction: column;
      margin-top: 30px;
    }
  `,
  contentSide: css`
    flex-direction: column;
    display: flex;
    width: 50%;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      width: 100%;
    }
  `,
  rankBlock: css`
    text-align: right;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      flex-direction: column;
    }
  `,
  servicesBlock: css`
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      padding: 0 20px;
    }
  `,
  rankLabel: {
    fontSize: '16px',
  },
  rankValue: {
    marginTop: 10,
    fontSize: '20px',
    display: 'block'
  },
  listWrapper: css`
    display: flex;
    flex-direction: column;
  `,
  rankListWrapper: css`
    align-self: flex-end;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      align-self: inherit;
    }
  `,
  listItemWithoutBorder: { border: 'none', margin: 0 },
  listWithoutBorder: css`
    margin-bottom: 20;
  `,
  addressBlock: {
    marginBottom: 40,
  },
  specialtiesBlock: {
    marginTop: 20,
  },
  ourRatingTitleStyle: css`
    font-size: 25px;
    vertical-align: -3px;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      font-size: 13px;
    }
  `,
  ourRatingValueStyle: css`
    font-size: 25px;
    font-weight: bold;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      font-size: 18px;
    }
  `,
  textUnderTable: {
    fontWeight: 'bold',
    maxWidth: 300,
    alignSelf: 'flex-end',
    color: ORANGE_COLOR
  },
  goBack: css`
    margin-bottom: 50px;
    display: inline-block;
    position: absolute;
    top: -70px;
    left: 0;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      top: -50px;
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  `,
  ratingValue: css`
    font-size: 15px;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      font-size: 13px;
    }
  `,
  itemTitle: css`
    font-size: 15px;
  `,
  stat: css`
    background-color: ${GRAY_COLOR}
  `
}
