import React from 'react'
import { Button, Icon } from 'antd'

import styles from './services/service-item/styles'

const ExpandCollapseBtn = ({ expanded, toggle }) => {
  return (
    <Button type="link" onClick={toggle} css={styles.expandIcon} >
      {
        expanded ? (
          <Icon type="up-circle" />
        ) : (
          <Icon type="down-circle" />
        )
      }
    </Button>
  )
};
export default React.memo(ExpandCollapseBtn);
