import React, { useCallback, useMemo } from 'react'
import { Card, Col, List, Progress, Row, Icon, Tooltip } from 'antd'
import styles from './styles'
import { mapDayToLabel } from '../../../helpers/days'
import { MAX_RANK, rankToColor } from '../../../helpers/rank'

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
}) => {
  const onHeaderPressCb = useCallback(() => {
    onHeaderPress({ pagePath });
  }, [onHeaderPress, pagePath]);
  const color = useMemo(() => !incomplete ? rankToColor(rank) : 'gray', [rank, incomplete]);
  return (
    <Card style={{ width: '100%', marginBottom: 20 }} title={<span onClick={onHeaderPressCb}>{name}</span>} bordered={false}>
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
          { incomplete && <p style={styles.incompleteText}>По данному автосервису нет достаточно информации для точной оценки!</p>}
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
      <div style={styles.line}>
        <label style={styles.label}>Так же выполняют:</label>
        <List
          dataSource={otherSpecialties}
          renderItem={item => (
            <List.Item style={styles.listItemWithoutBorder}>
              {item}
            </List.Item>
          )}
        />
      </div>
      <a href={pagePath} target="_blank">Перейти</a>
    </Card>
  );
};

export default React.memo(ServiceItem);
