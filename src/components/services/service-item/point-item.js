import CollapsibleForMobile from '../../collapsible-for-mobile'
import styles from './styles'
import { List } from 'antd'
import { mapDayToLabel } from '../../../helpers/days'
import React, { useCallback, useState } from 'react'
import ExpandCollapseBtn from '../../expand-collapse-btn'

const PointItem = ({
    title,
                     address,
                     phones,
                     workingHours,
                     onHeaderPressCb
                   }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleShowDetails = useCallback(() => setExpanded(!expanded), [expanded]);

  return <>
    {
      title ? (
        <CollapsibleForMobile expanded={expanded}>
          <div style={styles.line}>
            <i style={styles.label} css={styles.pointTitle}>{title}</i>
          </div>
        </CollapsibleForMobile>
      ) : null
    }
    <div style={styles.line}>
      <label style={styles.label}>Адрес:</label>
      <br/>
      <div>
        {address}
      </div>
    </div>
    <CollapsibleForMobile expanded={expanded}>
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
    </CollapsibleForMobile>
    <a onClick={() => onHeaderPressCb({ address })} style={styles.showOnMapBtn}>Показать на карте</a>
    <div css={styles.expandIconWrapper}>
      <ExpandCollapseBtn toggle={toggleShowDetails} expanded={expanded} />
    </div>
  </>;
}

export default React.memo(PointItem);
