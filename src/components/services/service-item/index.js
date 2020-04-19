import React, { useCallback, useMemo } from 'react'
import { Card, Col, List, Progress, Row, Icon, Button, Popover } from 'antd'
import styles from './styles'
import { mapDayToLabel } from '../../../helpers/days'
import { MAX_RANK, rankToColor } from '../../../helpers/rank'
import { AUTOMATIC_TRANSMISSION_REPAIR } from '../../../constants/specialized-keywords'
import ServiceStat from '../../service-stat'
import { GRAY_COLOR } from '../../../constants/colors'

export const ServiceItem = ({
  website,
  name,
  pagePath,
  points,
  mainSpecialties,
  otherSpecialties,
  rank,
  onHeaderPress,
  incomplete,
  specialized,
  onContactServicePress,
  setSelectedTab,
  sideForumsMentions,
  fakeReviews,
  feedbackWithClientsDirection,
  forumReviewsDirection,
  sideServicesRank,
}) => {
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
                  {
                    title && points.length > 1 && (
                      <div style={styles.line}>
                        <i style={styles.label} css={styles.pointTitle}>{title}</i>
                      </div>
                    )
                  }
                  <div style={styles.line}>
                    <label style={styles.label}>Адрес:</label>
                    <br/>
                    <div>
                      {address}
                    </div>
                  </div>
                  <div style={styles.line}>
                    <label style={styles.label}>Телефоны для связи:</label>
                    <br/>
                    <div>{phones.map(phone => <div key={phone}>{phone}</div>)}</div>
                  </div>
                  {
                    workingHours.length ? (
                      <div style={styles.line}>
                        <label style={styles.label}>Время работы:</label><br/><span>
                     <List
                       dataSource={workingHours}
                       renderItem={({ day, time }) => (
                         <List.Item style={styles.listItemWithoutBorder}>
                           {mapDayToLabel(day)}: <b>{time.map(({ from, to }) => <span key={`${from}${to}`}>{from} - {to}</span>)}</b>
                         </List.Item>
                       )}
                     />
                    </span>
                      </div>
                    ) : null
                  }
                  <a onClick={() => onHeaderPressCb({ address })} style={styles.showOnMapBtn}>Показать на карте</a>
                  <hr />
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
        <div style={styles.line}>
          <label style={styles.label}>Основные виды работ:</label>
          <List
            dataSource={mainSpecialties}
            renderItem={item => (
              <List.Item style={styles.listItemWithoutBorder}>
                {item}
              </List.Item>
            )}
          />
        </div>
        <br/>
        {
          otherSpecialties.length ? <div style={styles.line}>
            <label style={styles.label}>Так же выполняют:</label>
            <List
              dataSource={otherSpecialties}
              renderItem={item => (
                <List.Item style={styles.listItemWithoutBorder}>
                  {item}
                </List.Item>
              )}
            />
          </div> : null
        }
        <Button css={styles.contactBtn} onClick={onContactServicePressCb} block ghost type="primary">Записаться на СТО с гарантией</Button>
      </Card>
    </div>
  );
};

export default React.memo(ServiceItem);
