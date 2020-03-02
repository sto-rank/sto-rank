import { Icon, Tooltip, Typography } from 'antd'
import React from 'react'
import styles from './styles'

const { Title } = Typography;

export default ({ title, description, css }) => (
  <span style={{ lineHeight: '20px' }}>
    <Title level={2}>
      <span css={[styles.ratingTitle, css]}>
        {title}
        {' '}
        {
          description && (
            <Tooltip title={description}>
              <Icon type="info-circle" theme="twoTone" />
            </Tooltip>
          )
        }
      </span>
    </Title>
  </span>
)
