import { Icon, Tooltip, Typography } from 'antd'
import React from 'react'

const { Title } = Typography;

export default ({ title, description, style }) => (
  <span style={{ lineHeight: '20px' }}>
    <Title level={2} style={{ fontSize: 15, verticalAlign: 2, display: 'inline-block', ...style }}>{title}</Title> {
      description && (
        <Tooltip title={description}>
          <Icon type="info-circle" theme="twoTone" />
        </Tooltip>
      )
    }
  </span>
)
