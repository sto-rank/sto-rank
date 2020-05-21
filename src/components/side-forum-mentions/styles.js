import { css } from '@emotion/core'

export default {
  sideLink: css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    margin-top: 5px;
    font-size: 12px;
    text-align: right;
  `,
  sideLinksWrapper: css`
  `,
  sideLinkWrapper: css`
    justify-content: flex-end;
    display: flex;
  `,
  label: css`
    font-size: 15px;
    margin-bottom: 10px;
  `,
}
