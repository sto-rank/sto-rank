import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;

export default React.memo(({ type, ...rest }) => (
  <Text
    type={ type !== 'safe' ? type : undefined }
    {...rest}
    style={{ color: type === 'safe' ? 'green' : undefined, ...rest.styles }}
  />
))
