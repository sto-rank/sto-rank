import React from 'react';
import { Collapse } from 'react-collapse';
import styles from './styles'

const CollapsibleForMobile = ({ children, expanded }) => {
  return (
    <>
      <div css={styles.desktopVersion}>
        {children}
      </div>
      <div css={styles.mobileVersion}>
        <Collapse isOpened={expanded}>
          {children}
        </Collapse>
      </div>
    </>
  )
};

export default React.memo(CollapsibleForMobile);
