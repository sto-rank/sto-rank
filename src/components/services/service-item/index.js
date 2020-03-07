import React, { useCallback, useMemo } from 'react'
import { Card, Col, List, Progress, Row, Icon, Button } from 'antd'
import styles from './styles'
import { mapDayToLabel } from '../../../helpers/days'
import { MAX_RANK, rankToColor } from '../../../helpers/rank'
import { AUTOMATIC_TRANSMISSION_REPAIR } from '../../../constants/specialized-keywords'

export const ServiceItem = ({
  website,
  name,
  pagePath,
  address,
  workingHours,
  mainSpecialties,
  otherSpecialties,
  rank,
  onHeaderPress,
  incomplete,
  specialized,
  onContactServicePress,
}) => {
  const onHeaderPressCb = useCallback(() => {
    onHeaderPress({ pagePath });
  }, [onHeaderPress, pagePath]);
  const color = useMemo(() => !incomplete ? rankToColor(rank) : 'gray', [rank, incomplete]);
  const onContactServicePressCb = useCallback(() => {
    onContactServicePress({ pagePath });
  }, [onContactServicePress])
  return (
    <div>
      <Card
        style={{ width: '100%', marginBottom: 20 }}
        title={<span css={styles.cardTitle}>{name}<span style={styles.cardHeadLink} onClick={onHeaderPressCb} /></span>}
        bordered={false}
        actions={[
          <a href={pagePath} target="_blank" style={styles.detailsBtn}>Датеальнее</a>,
          <a onClick={onHeaderPressCb} style={styles.detailsBtn}>Показать на карте</a>
        ]}
      >
        <Row>
          <Col span={12}>
            <div style={styles.line}>
              <label style={styles.label}>Адрес:</label><br/><span>{address}</span>
            </div>
            <div style={styles.line}>
              <label style={styles.label}>Вебсайт:</label><br/><span><a href={website} target="_blank">{website}</a></span>
            </div>
            <div style={styles.line}>
              <label style={styles.label}>Время работы:</label><br/><span>
                {
                  workingHours.map(({ day, time }) => <span key={`${day}${time}`}>{mapDayToLabel(day)}, {time}</span>)
                }
              </span>
            </div>
          </Col>
          <Col span={12} style={styles.rankBlock}>
            { incomplete && <p style={{ ...styles.infoText, ...styles.warningText }}><Icon type="warning" /> По данному автосервису нет достаточно информации для точной оценки!</p>}
            { specialized.includes(AUTOMATIC_TRANSMISSION_REPAIR) && <p style={{ ...styles.infoText, ...styles.successText }}><Icon type="check" /> Узкопрофильное СТО по ремонту АКПП</p>}
            <Progress
              strokeLinecap="square"
              strokeWidth={10}
              type="circle"
              percent={rank / MAX_RANK * 100}
              width={80}
              format={() => <b style={{ color }}>{rank}</b>}
              strokeColor={color}
            />
          </Col>
        </Row>
        <br/>
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
