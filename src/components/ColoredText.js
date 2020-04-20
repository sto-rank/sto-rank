import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;

export default React.memo(({ type, ...rest }) => (
  <Text
    type={ type !== 'safe' && type }
    {...rest}
    style={{ color: type === 'safe' && 'green', ...rest.styles }}
  />
))
