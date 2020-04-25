import React, { useCallback, useEffect, useMemo } from 'react'
import { Map, Popup, TileLayer } from 'react-leaflet'

import ExtendedMarker from '../../components/extended-marker'
import styles from '../../components/services/styles'
import { MAX_RANK, rankToColor } from '../../helpers/rank'
import { AUTOMATIC_TRANSMISSION_REPAIR } from '../../constants/specialized-keywords'
import { Button, Icon } from 'antd'
import { mapDayToLabel } from '../../helpers/days'

const ZOOM = 11
const defaultCenter = [
  50.4851493,
  30.4721233
];

const Item = React.memo(({
                onContactServicePress,
                selectedServiceId,
                onMarkerPress,
                points,
                name,
                pagePath,
                rank,
                incomplete,
                specialized,
              }) => {
  const onContactServicePressCb = useCallback(() => {
    onContactServicePress({ pagePath });
  }, [onContactServicePress]);

  return (
    <>
      {
        points.filter(o => o.coordinates).map(({
                      coordinates: [ lat, lng ],
                      address,
                      workingHours,
                    }) => (
          <ExtendedMarker
            key={`${pagePath}${address}`}
            isOpen={`${pagePath}${address}` === selectedServiceId}
            position={[lat, lng]}
            onClick={() => onMarkerPress({ pagePath, address })}
          >
            <Popup>
              <p><b css={{ color: !incomplete ? rankToColor(rank) : 'gray' }}>{rank} из {MAX_RANK}</b></p>
              <p>{ incomplete ? <span css={{ ...styles.infoText, ...styles.warningText }}><Icon type="warning" /> По данному автосервису нет достаточно информации для точной оценки!</span> : null}</p>
              <p>{ specialized.includes(AUTOMATIC_TRANSMISSION_REPAIR) ? <span css={{ ...styles.infoText, ...styles.successText }}><Icon type="check" /> Узкопрофильное СТО по ремонту АКПП</span> : null}</p>
              <p css={styles.popupName}><b>{name}</b></p>
              <p>{address}</p>
              {
                workingHours.map(({ day, time }) => <div key={`${day}${time}`}>{mapDayToLabel(day)}, {time.map(({ from, to }) => <span key={`${from}${to}`}>{from} - {to}</span>)}</div>)
              }
              <p><a href={pagePath} target="_blank">Детальнее</a></p>
              <Button css={styles.contactBtn} onClick={onContactServicePressCb} block ghost type="primary">Записаться на СТО с гарантией</Button>
            </Popup>
          </ExtendedMarker>
        ))
      }
    </>
  )
});

export default React.memo(function MapComp ({
                                   selectedService,
                                              services: servicesArr = [],
                                   onContactServicePress,
                                   selectedServiceId,
                                   onMarkerPress
                                 }) {
  const services = useMemo(() => servicesArr, [servicesArr.length])

  const mapCenter = useMemo(() => {
    if (selectedService && selectedService.coordinates) {
      return selectedService.coordinates;
    }

    return defaultCenter
  }, [selectedService]);

  return (
    <div css={styles.map}>
      {
        typeof window !== 'undefined' ? (
          <Map center={mapCenter} zoom={ZOOM} css={styles.mapElem}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              services.map((item) => (
                <Item
                  key={JSON.stringify(item)}
                  {...item}
                  selectedServiceId={selectedServiceId}
                  onMarkerPress={onMarkerPress}
                  onContactServicePress={onContactServicePress} />))
            }
          </Map>
        ) : null
      }
    </div>
  )
})
