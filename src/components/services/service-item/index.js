import React, { useCallback, useMemo, useState} from 'react'
import { Card, List, Progress, Icon, Button } from 'antd'
import styles from './styles'
import { MAX_RANK, rankToColor } from '../../../helpers/rank'
import { AUTOMATIC_TRANSMISSION_REPAIR } from '../../../constants/specialized-keywords'
import ServiceStat from '../../service-stat'
import { GRAY_COLOR } from '../../../constants/colors'
import PointItem from './point-item'
import { Collapse } from 'react-collapse'

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

  return (
    <div>
      <Card
        style={{ width: '100%', marginBottom: 20 }}
        title={<span css={styles.cardTitle}>
          <span css={styles.cardTitleText}>{name}</span>
          <Progress
            css={styles.progressBar}
            strokeLinecap="square"
            strokeWidth={10}
            type="circle"
            percent={rank / MAX_RANK * 100}
            width={50}
            format={() => <b style={{ color }}>{rank}</b>}
            strokeColor={color}
          />
        </span>}
        bordered={false}
        actions={[
          <a href={pagePath} target="_blank" style={styles.detailsBtn}>Датеальнее</a>
        ]}
      >
        <div css={styles.blockWrapper}>
          <div css={styles.descriptionBlock}>
            <div style={styles.line}>
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
            { incomplete && <p style={{ ...styles.infoText, ...styles.warningText }}><Icon type="warning" /> По данному автосервису нет достаточно информации для точной оценки!</p>}
            { specialized.includes(AUTOMATIC_TRANSMISSION_REPAIR) && <p style={{ ...styles.infoText, ...styles.successText }}><Icon type="check" /> Узкопрофильное СТО по ремонту АКПП</p>}
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
          specialties.length ? (
            <div style={styles.line}>
              <label style={styles.label}>Выполняемые виды работ:</label>
              <List
                dataSource={specialties.slice(0, 5)}
                renderItem={item => (
                  <List.Item style={styles.listItemWithoutBorder}>
                    {item}
                  </List.Item>
                )}
              />
              {
                specialties.length > 5 && <>
                  <Collapse isOpened={expandSpecialities}>
                    <List
                      dataSource={specialties.slice(5)}
                      renderItem={item => (
                        <List.Item style={styles.listItemWithoutBorder}>
                          {item}
                        </List.Item>
                      )}
                    />
                  </Collapse>
                  <Button type="link" css={styles.showHideSpecialities} onClick={toggleExpandSpecialities}>
                    { !expandSpecialities ? <>Показать все</> : <>Скрыть</> }
                  </Button>
                </>
              }
            </div>
          ) : null
        }
        <Button css={styles.contactBtn} onClick={onContactServicePressCb} block ghost type="primary">Записаться на СТО с гарантией</Button>
      </Card>
    </div>
  );
};

export default React.memo(ServiceItem);
