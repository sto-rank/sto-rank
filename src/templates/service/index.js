import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { List } from 'antd';
import { Map, TileLayer, Popup } from 'react-leaflet'

import styles from './styles'
import { mapDayToLabel } from '../../helpers/days'
import ExtendedMarker from '../../components/extended-marker'
import { averageGeolocation } from '../../helpers/coordinates'
import ServiceStat from '../../components/service-stat'
import { LIGHT_GRAY } from '../../constants/colors'

const ZOOM_FOR_ONE_POINT = 15;
const ZOOM_FOR_FEW_POINTS = 10;

export default React.memo(function Service(props) {

  const { data: { services: { service: {
    name,
    sideServicesRank,
    fakeReviews,
    feedbackWithClientsDirection,
    solveCustomerClaimsPercentage,
    forumReviewsDirection,
    points,
    website,
    incomplete,
    specialties,
  } } } } = props;

  const centerPointsCoords = useMemo(() => {
    const averageCoord = averageGeolocation(points.filter(({ coordinates }) => coordinates)
      .map(({ coordinates: [latitude, longitude] }) => ({
        latitude,
        longitude,
      }))
    );
    return [averageCoord.latitude, averageCoord.longitude]
  }, [points]);

  const pointsToRender = useMemo(() => points.filter(({ coordinates }) => coordinates), [points]);

  return (
    <div style={styles.container}>
      <h1 css={styles.title}>
        <div style={styles.titleText}>{name}</div>
      </h1>
      <div css={styles.content}>
        <div css={[styles.contentSide, styles.rankBlock ]}>
          <div css={[styles.listWrapper, styles.rankListWrapper]}>
            {
              incomplete ? (
                <p style={styles.textUnderTable}>По данному автосервису нет достаточно информации для точной оценки!</p>
              ) : null
            }
            <ServiceStat
              fakeReviews={fakeReviews}
              feedbackWithClientsDirection={feedbackWithClientsDirection}
              solveCustomerClaimsPercentage={solveCustomerClaimsPercentage}
              forumReviewsDirection={forumReviewsDirection}
              sideServicesRank={sideServicesRank}
              incomplete={incomplete}
              rowColor={LIGHT_GRAY}
            />
          </div>
        </div>
        <div css={[styles.contentSide, styles.servicesBlock]}>
          <div>
            <a css={styles.goBack} href="/services"><b>К списку СТО</b></a>
          </div>
          <section style={styles.addressBlock}>
            <h2 css={styles.itemTitle}>Вебсайт:</h2>
            <div>
              <a href={website} rel="noopener noreferrer" target="_blank">{website}</a>
            </div>
          </section>
          {
            pointsToRender.map(({
              address,
              phones,
              workingHours,
            }) => <div key={address}>
              <section style={styles.addressBlock}>
                <h2 css={styles.itemTitle}>Адрес:</h2>
                <div>
                  {address}
                </div>
              </section>
              <section style={styles.addressBlock}>
                <h2 css={styles.itemTitle}>Телефоны для связи:</h2>
                <div>
                  {phones.map(phone => <div key={phone}>{phone}</div>)}
                </div>
              </section>
                {
                  workingHours.length ? (
                    <section style={styles.addressBlock}>
                      <h2 css={styles.itemTitle}>Время работы:</h2>
                      <div>
                        <div css={[styles.listWrapper, styles.listWithoutBorder]}>
                          <List
                            dataSource={workingHours}
                            renderItem={({ day, time }) => (
                              <List.Item style={styles.listItemWithoutBorder}>
                                {mapDayToLabel(day)}: <b>{time.map(({ from, to }) => <span key={`${from}${to}`}>{from} - {to}</span>)}</b>
                              </List.Item>
                            )}
                          />
                        </div>
                      </div>
                    </section>
                  ) : null
                }
              <hr/>
            </div>)
          }
          <div style={styles.specialtiesBlock}>
            <section>
              <h2 css={styles.itemTitle}>Выполняемые виды работ:</h2>
              <div css={styles.listWrapper}>
                <List
                  dataSource={specialties}
                  renderItem={item => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      <div style={styles.map}>
        {
          typeof window !== 'undefined' ? (
            <Map center={centerPointsCoords} zoom={points.length === 1 ? ZOOM_FOR_ONE_POINT : ZOOM_FOR_FEW_POINTS} style={{ height: 250 }}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {
                points.filter(o => o.coordinates).map(({ address, coordinates }) => (
                  <div key={address}>
                  <ExtendedMarker
                    isOpen
                    position={coordinates}
                  >
                    <Popup>
                      {name} <br /> {address}
                    </Popup>
                  </ExtendedMarker>
                  </div>
                ))
              }
            </Map>
          ) : null
        }
      </div>
    </div>
  )
});

export const pageQuery = graphql`
  query($path: String!) {
    services {
      service(query: { pagePath: $path }) {
        specialized
        specialties
        pagePath
        name
        description
        website
        points {
          address
          phones
          coordinates
          title
          workingHours {
            day
            time {
              from
              to
            }
          }
        }
        sideServicesRank {
          name
          link
          rank
          reviewsAmount
        }
        fakeReviews
        feedbackWithClientsDirection
        solveCustomerClaimsPercentage
        forumReviewsDirection
        rank
        incomplete
      }
    }
  }
`
