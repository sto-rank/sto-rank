import React, { useCallback, useMemo, useState} from 'react'
import { Card, Progress, Icon } from 'antd'
import styles from './styles'
import { MAX_RANK, rankToColor } from '../../../helpers/rank'
import { AUTOMATIC_TRANSMISSION_REPAIR } from '../../../constants/specialized-keywords'
import ServiceStat from '../../service-stat'
import { GRAY_COLOR } from '../../../constants/colors'
import PointItem from './point-item'

const getHighlightedText = (text, highlight) => {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return <span> { parts.map((part, i) =>
    <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
  } </span>;
}
export const ServiceItem = ({
  website,
  name,
  pagePath,
  points,
  specialties,
  rank,
  onHeaderPress,
  incomplete,
  specialized,
  onContactServicePress,
  setSelectedTab,
  sideForumsMentions,
  fakeReviews,
  feedbackWithClientsDirection,
                              solveCustomerClaimsPercentage,
  forumReviewsDirection,
  sideServicesRank,
                              specializationSearch,
}) => {
  const [expandSpecialities, setExpandSpecialities] = useState(false);
  const toggleExpandSpecialities = useCallback(() => setExpandSpecialities(!expandSpecialities), [expandSpecialities]);

  const color = useMemo(() => !incomplete ? rankToColor(rank) : 'gray', [rank, incomplete]);
  const onContactServicePressCb = useCallback(() => {
    onContactServicePress({ pagePath });
  }, [onContactServicePress]);
  const sideForumsMentionsToRender = useMemo(() => sideForumsMentions.filter(o => o.textNodes.length), [sideForumsMentions]);

  const onHeaderPressCb = useCallback(({ address }) => {
    onHeaderPress({ pagePath, address });
    setSelectedTab('map');
  }, [onHeaderPress, pagePath]);

  const specialitiesToRender = useMemo(() => {
    if (!specializationSearch) return specialties;
    return specialties.sort((a, b) => {
      if (!a.toLowerCase().includes(specializationSearch.toLowerCase()) && b.toLowerCase().includes(specializationSearch.toLowerCase())) return 1;
      return -1;
    })
  }, [specialties, specializationSearch])

  return (
    <div>
      <Card
        style={{ width: '100%', marginBottom: 20 }}
        title={<span css={styles.cardTitle}>
          <span css={styles.cardTitleText}>Автосервис "{name}"</span>
          <Progress
            strokeLinecap="square"
            strokeWidth={10}
            type="circle"
            percent={rank / MAX_RANK * 100}
            width={50}
            format={() => <b style={{ color }}>{rank !== '0' ? rank : '?'}</b>}
            strokeColor={color}
          />
        </span>}
        bordered={false}
        actions={[
          <a href={pagePath} target="_blank" style={styles.detailsBtn}>Датеальнее...</a>,
          <a css={styles.contactBtn} onClick={onContactServicePressCb} >Записаться на СТО</a>
        ]}
      >
        <div css={styles.blockWrapper}>
          <div css={styles.descriptionBlock}>
            <div css={styles.line}>
              <label style={styles.label}>Вебсайт:</label><br/><span><a href={`http://${website}`} target="_blank">{website}</a></span>
            </div>
            {
              points.filter(point => point.coordinates).map(({
                            address,
                            workingHours,
                            phones,
                            title,
                          }) => (
                <div key={`${address}${JSON.stringify(workingHours)}`} css={styles.point}>
                  <PointItem
                    phones={phones}
                    address={address}
                    workingHours={workingHours}
                    onHeaderPressCb={onHeaderPressCb}
                    title={title && points.length > 1 ? title : null}
                  />
                  <hr css={styles.pointItemLine} />
                </div>
              ))
            }
          </div>
          <div css={styles.rankBlock}>
            { incomplete ? <p style={{ ...styles.infoText, ...styles.warningText }}><Icon type="warning" /> По данному автосервису нет достаточно информации для точной оценки!</p> : null}
            { specialized.includes(AUTOMATIC_TRANSMISSION_REPAIR) ? <p style={{ ...styles.infoText, ...styles.successText }}><Icon type="check" /> Узкопрофильное СТО по ремонту АКПП</p> : null}
              <ServiceStat
                fakeReviews={fakeReviews}
                feedbackWithClientsDirection={feedbackWithClientsDirection}
                solveCustomerClaimsPercentage={solveCustomerClaimsPercentage}
                forumReviewsDirection={forumReviewsDirection}
                sideServicesRank={sideServicesRank}
                incomplete={incomplete}
                hideRank
                titleFontSize={12}
                rowColor={GRAY_COLOR}
                rank={rank}
              />
              {
                sideForumsMentionsToRender.length ? (
                  <div css={styles.sideLinksWrapper}>
                    <label style={{ ...styles.label, ...styles.sideLinksTitle }}>
                      Упоминания на форумах:
                    </label>
                    {
                      sideForumsMentionsToRender.map(({ link }) => (
                        <div key={link}>
                          <div style={styles.sideLink}>
                            <a target="_blank" href={link}>{link}</a>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : null
              }
          </div>
        </div>
        {
          specialitiesToRender.length ? (
            <div css={styles.line}>
              <label style={styles.label}>Выполняемые виды работ:</label>
              <div css={styles.servicesLine}>
                {
                  getHighlightedText(specialitiesToRender.slice(0, 5).join(', '), specializationSearch || '')
                }
              </div>
            </div>
          ) : null
        }
      </Card>
    </div>
  );
};

export default React.memo(ServiceItem);
