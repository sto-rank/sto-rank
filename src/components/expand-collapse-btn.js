import React from 'react'
import { Button, Icon } from 'antd'

import styles from './services/service-item/styles'

const ExpandCollapseBtn = ({ expanded, toggle }) => {
  return (
    <Button type="link" onClick={toggle}>
      {
        expanded ? (
          <Icon type="up-circle" css={styles.expandIcon} />
        ) : (
          <Icon type="down-circle" css={styles.expandIcon} />
        )
      }
    </Button>
  )
};
export default React.memo(ExpandCollapseBtn);
