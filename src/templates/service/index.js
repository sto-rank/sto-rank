import React, { useCallback, useMemo } from 'react'
import { graphql } from 'gatsby'
import { Button, List } from 'antd'
import moment from 'moment'
import { Map, TileLayer, Popup } from 'react-leaflet'

import styles from './styles'
import { mapDayToLabel } from '../../helpers/days'
import ExtendedMarker from '../../components/extended-marker'
import SideForumMentions from '../../components/side-forum-mentions'
import { averageGeolocation } from '../../helpers/coordinates'
import ServiceStat from '../../components/service-stat'
import { LIGHT_GRAY } from '../../constants/colors'
import SEO from '../../components/seo'
import plural from "plural-ru"
import ContactForm from '../../components/contact-form'
import useContactForm from '../../hooks/useContactForm'

const ZOOM_FOR_ONE_POINT = 15;
const ZOOM_FOR_FEW_POINTS = 10;

export default React.memo(function Service(props) {

  const { data: { services: { service } } } = props;

  const  {
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
    pagePath,
    rank,
    sideForumsMentions,
  } = service;
  const {
    onContactServiceCancel,
    onContactServicePress,
    contactService,
  } = useContactForm({ services: [service] });

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

  const onContactServicePressCb = useCallback(() => {
    onContactServicePress({ pagePath });
  }, [onContactServicePress]);

  const reviewsAmount = sideServicesRank.reduce((prev, o) => prev + o.reviewsAmount, 0)

  const reviewsToRender = useMemo(() => {
    return sideServicesRank.reduce((prev, { reviews }) => [ ...prev, ...reviews ], [])
      .filter(o => o.comment)
      .sort((a, b) => a.date > b.date ? -1 : 1);
  }, [sideServicesRank]);

  return (
    <div style={styles.container}>
      <SEO
        title={`${reviewsAmount} ${plural(reviewsAmount, 'отзыв', 'отзыва', 'отзывов')} об СТО "${name}"`}
        description={`Киевский автосервис: ${name}. ${pointsToRender.map(o => o.address).join('. ')}`}
      />
      <h1 css={styles.title}>
        <div style={styles.titleText}>{name}</div>
      </h1>
      <div css={styles.content}>
        <div css={[styles.contentSide, styles.rankBlock ]}>
          <div css={[styles.listWrapper, styles.rankListWrapper]} className="service-stat">
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
              rank={rank}
            />
            <div css={styles.contactBtn}>
              <Button onClick={onContactServicePressCb} block ghost type="primary">Записаться на СТО</Button>
            </div>
            <SideForumMentions sideForumsMentions={sideForumsMentions} website={website} />
            <section css={[styles.addressBlock, styles.reviewsBlock]}>
              <h2 css={styles.itemTitle}>Последние отзывы:</h2>
              {
                reviewsToRender.map(({ comment, date, link }) => (
                  <div css={styles.review}>
                    <div css={styles.reviewDate}>{moment(date).format('DD.MM.YYYY')}</div>
                    <div css={styles.reviewComment}>{comment}</div>
                  </div>
                ))
              }
            </section>
          </div>
        </div>
        <div css={[styles.contentSide, styles.servicesBlock]}>
          <div>
            <a css={styles.goBack} href="/"><b>К списку СТО</b></a>
          </div>
          <section css={styles.addressBlock}>
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
              <section css={styles.addressBlock}>
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
                    <section css={styles.addressBlock}>
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
      <ContactForm selectedServiceName={contactService ? contactService.name : undefined} onCancel={onContactServiceCancel} />
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
          reviews {
            comment
            date
            rank
          }
        }
        fakeReviews
        feedbackWithClientsDirection
        solveCustomerClaimsPercentage
        forumReviewsDirection
        rank
        incomplete
        sideForumsMentions {
          link
          textNodes {
            messages
            text
          }
        }
      }
    }
  }
`
