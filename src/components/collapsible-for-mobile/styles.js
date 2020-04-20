import { css } from '@emotion/core'
import { MOBILE_DEVICE_LAYOUT_TRASHOLD } from '../../constants/layout'

export default {
  mobileVersion: css`
    display: none;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      display: block;
    }
  `,
  desktopVersion: css`
    display: block;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      display: none;
    }
  `
}
