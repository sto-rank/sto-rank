import { Icon, Tooltip, Typography } from 'antd'
import React from 'react'

const { Title } = Typography;

export default ({ title, description }) => (
  <span>
    <Title level={2} style={{ fontSize: 15, display: 'inline-block' }}>{title}</Title> {
      description && (
        <Tooltip title={description}>
          <Icon type="info-circle" theme="twoTone" />
        </Tooltip>
      )
    }
  </span>
)
