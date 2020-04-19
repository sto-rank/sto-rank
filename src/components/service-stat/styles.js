import { css } from '@emotion/core'

import { MOBILE_DEVICE_LAYOUT_TRASHOLD } from '../../constants/layout'

export default {
  ratingValue: css`
    font-size: 15px;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      font-size: 13px;
    }
  `,
  ratingTitle: css`
    font-size: 13px;
    vertical-align: 2px;
    display: inline-block;
    @media(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px) {
      font-size: 12px;
    }
  `,
}
