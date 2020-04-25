import { Icon, Tooltip } from 'antd'
import React from 'react'
import styles from './styles'

export default React.memo(({ title, description, css, style }) => (
  <span >
    <h2 style={{ marginBottom: 0 }}>
      <span css={[styles.ratingTitle, css]} style={style}>
        {title}
        {' '}
        {
          description ? (
            <Tooltip title={description}>
              <Icon type="info-circle" theme="twoTone" />
            </Tooltip>
          ) : null
        }
      </span>
    </h2>
  </span>
))
