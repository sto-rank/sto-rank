import { css } from '@emotion/core'
import { BLUE_COLOR, DARK_GRAY_COLOR, GRAY_COLOR, GREEN_COLOR, ORANGE_COLOR } from '../../constants/colors'
import { MOBILE_DEVICE_LAYOUT_TRASHOLD } from '../../constants/layout'

const HEADER_HEIGHT = 200;
const TABS_OFFSET = 55;

export default {
  container: css`
    flex-direction: row;
    display: flex;
    position: relative;
    z-index: 1111;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      display: none;
    }
  `,
  mobileContainer: css`
    display: none;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      display: block;
    }
  `,
  services: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    padding-bottom: 50px;
  `,
  map: css`
    height: 100vh;
    width: 50%;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      width: 100%;
      height: 100vh;
    }
  `,
  listBlock: css`
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      width: 100%;
      height: calc(100vh - ${TABS_OFFSET}px);
    }
  `,
  header: css`
    height: ${HEADER_HEIGHT}px;
    background-color: white;
    z-index: 2222;
    display: flex;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 50px;
  `,
  selectedServiceHeader: css`
    background: ${GRAY_COLOR};
    margin-left: -20px;
    margin-right: -20px;
    padding: 20px 40px;
    margin-bottom: 30px;
  `,
  title: css`
    width: 100%;
    text-align: center;
    display: inline-block;
    color: rgba(0, 0, 0, 0.85) !important;
    margin-bottom: 0;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      padding-left: 20px;
      padding-right: 20px;
      font-size: 30px;
    }
  `,
  actionsBlock: css`
    textAlign: left;
    width: 100%;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  `,
  listSeparator: css`
    font-size: 20px;
    padding: 20px;
    text-align: center;
    font-weight: bold;
  `,
  infoText: css`
    font-weight: bold;
    max-width: 300px;
    align-self: flex-end;
    font-size: 12px;
  `,
  warningText: css`
    color: ${ORANGE_COLOR};
  `,
  successText: css`
    color: ${GREEN_COLOR};
  `,
  scrollItem: css`
    width: 100%;
  `,
  mapElem: css`
    height: 100%;
    width: 100%;
  `,
  form: css`
    padding-left: 20px;
    padding-right: 20px;
  `,
  popupName: css`
    text-transform: capitalize;
  `,
  hideBlock: css`
    opacity: 0;
  `,
  selectedService: css`
    background: white;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: auto;
  `,
  list: css`
    width: 100%;
    background: white;
    transition: opacity .5s;
    opacity: 1;
  `,
  paginationWrapper: css`
    text-align: center;
  `,
  selectedServiceTitle: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
  `,
  closeBtn: css`
    cursor: pointer;
  `,
  listWrapper: css`
    padding-left: 20px;
    padding-right: 20px;
    width: 50%;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      width: 100%;
      height: calc(100vh - ${TABS_OFFSET}px);
      padding-left: 0;
      padding-right: 0;
    }
  `
}
