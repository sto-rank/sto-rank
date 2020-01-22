import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;

export default ({ type, ...rest }) => (
  <Text
    type={ type !== 'safe' && type }
    style={{ color: type === 'safe' && 'green' }}
    {...rest}
  />
)
