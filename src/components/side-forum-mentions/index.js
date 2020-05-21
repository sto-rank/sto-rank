import React, { useMemo } from 'react'
import styles from './styles'

export const SideForumMentions = ({
  sideForumsMentions,
                                    website
}) => {
  const sideForumsMentionsToRender = useMemo(() => (
    sideForumsMentions.filter(o => !o.link.includes(website))
  ), [sideForumsMentions]);

  return (
    <>
      {
        sideForumsMentionsToRender.length ? (
          <>
            <h2 css={styles.label}>
              Упоминания на форумах сторонних ресурсах:
            </h2>
            <div css={styles.sideLinksWrapper}>
              {
                sideForumsMentionsToRender.map(({ link }) => (
                  <div css={styles.sideLink}>
                    <a target="_blank" href={link}>{link}</a>
                  </div>
                ))
              }
            </div>
          </>
        ) : null
      }
    </>
  );
};

export default React.memo(SideForumMentions);
