import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { Map, TileLayer, Popup, Marker } from 'react-leaflet'

import styles from './styles'
import { calcRank } from "../../helpers/rank"

const ZOOM = 15;

export default function Service({ data: { servicesJson } }) {
  const {
    name,
    coordinates,
    mainSpecialties,
    otherSpecialties,
    sideServicesRank,
    fakeReviews,
    feedbackWithClientsDirection,
    forumReviewsDirection
  } = servicesJson;

  const rank = useMemo(() => calcRank({
    fakeReviews,
    feedbackWithClientsDirection,
    forumReviewsDirection,
    sideServicesRank: sideServicesRank.map(o => o.rank),
  }), [fakeReviews, feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>СТО "{name}"</h1>
      </div>
      <div style={styles.content}>
        <div style={{ ...styles.contentSide, ...styles.specializationsBlock }}>
          <div>
            <h3 className="list-heading">Основные виды работ:</h3>
            <ul>
              {
                mainSpecialties.map(o => (
                  <li key={o}>{o}</li>
                ))
              }
            </ul>
          </div>
          <div>
            <h3 className="list-heading">Так же выполняют:</h3>
            <ul>
              {
                otherSpecialties.map(o => (
                  <li key={o}>{o}</li>
                ))
              }
            </ul>
          </div>
        </div>
        <div style={{ ...styles.contentSide, ...styles.rankBlock }}>
          <div>
            <h3>
              <span style={styles.rankLabel}>
                Наш рейтинг:
              </span>
              <span style={styles.rankValue}>
                {rank.toFixed(1)}
              </span>
            </h3>
          </div>
          <div>
            <h3>
              <span style={styles.rankLabel}>
                Реакция на спорные ситуации:
              </span>
              <span style={styles.rankValue}>
                {feedbackWithClientsDirection === 1 && 'Всегда'}
                {feedbackWithClientsDirection === 0 && 'Иногда'}
                {feedbackWithClientsDirection === -1 && 'Никогда'}
              </span>
            </h3>
          </div>
          <div>
            <h3>
              <span style={styles.rankLabel}>
                Отзывы авторитетных пользователей на форумах:
              </span>
              <span style={styles.rankValue}>
                {forumReviewsDirection === 1 && 'Положительные'}
                {forumReviewsDirection === 0 && 'Отсутствуют'}
                {forumReviewsDirection === -1 && 'Отрицательные'}
              </span>
            </h3>
          </div>
          <div>
            <h3>
              <span style={styles.rankLabel}>
                Накрутка положительных отзывов:
              </span>
              <span style={styles.rankValue}>
                {fakeReviews ? 'Присутсвует' : 'Отсутсвует'}
              </span>
            </h3>
          </div>
          {
            sideServicesRank.map(o => (
              <div>
                <h3>
                  <span style={styles.rankLabel}>Рейтинг {o.name}:</span>
                  <span style={styles.rankValue}>{o.rank.toFixed(1)}</span>
                </h3>
              </div>
            ))
          }
        </div>
      </div>
      <div style={styles.map}>
        <div style={styles.mapOverlay} />
        {
          typeof window !== 'undefined' && (
            <Map center={coordinates} zoom={ZOOM} style={{ height: 250 }}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={coordinates}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </Map>
          )
        }
      </div>
    </div>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    servicesJson(pagePath: { eq: $path }) {
      name
      description
      coordinates {
        lat
        lng
      }
      address
      workingHours {
        day
        time
      }
      website
      sideServicesRank {
        name
        link
        rank
      }
      mainSpecialties
      otherSpecialties
      fakeReviews
      feedbackWithClientsDirection
      forumReviewsDirection
    }
  }
`
