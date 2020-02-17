import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Element, scroller } from 'react-scroll'
import { Map, Popup, TileLayer } from 'react-leaflet'

import ExtendedMarker from '../../components/extended-marker'
import styles from './styles'
import ServiceItem from './service-item'

const ZOOM = 15
const defaultCenter = [
  50.4851493,
  30.4721233
]

export default function Services() {
  const { allServicesJson: { edges } } = useStaticQuery(graphql`
    {
      allServicesJson {
        edges {
          node {
            pagePath
            name
            description
            address
            website
            coordinates {
              lat
              lng
            }
            mainSpecialties
            otherSpecialties
            workingHours {
              day
              time
            }
            sideServicesRank {
              name
              link
              rank
            }
            fakeReviews
            feedbackWithClientsDirection
            forumReviewsDirection
          }
        }
      }
    }
  `);
  const [selectedServiceId, setSelectedServiceId] = useState();

  const selectedServiceEdge = useMemo(() => edges.find(edge => edge.node.pagePath === selectedServiceId), [edges, selectedServiceId]);

  const mapCenter = useMemo(() => {
    if (selectedServiceEdge && selectedServiceEdge.node.coordinates) {
      const { lat, lng } = selectedServiceEdge.node.coordinates;
      return [lat, lng];
    }

    return defaultCenter
  }, [selectedServiceEdge]);

  const onMarkerPress = useCallback(({ pagePath }) => {
    setSelectedServiceId(pagePath);
  }, []);
  const onListItemPress = useCallback(({ pagePath }) => {
    setSelectedServiceId(pagePath);
  }, []);

  useEffect(() => {
    scroller.scrollTo(selectedServiceId, { containerId: 'servicesList', smooth: true })
  }, [selectedServiceId]);

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>СТО Киева  <br/> сепциализирующиеся на ремонте АКПП</h1>
      </div>
      <div style={styles.container}>
        <Element style={styles.services} id="servicesList">
          {
            edges.map(({
              node: serviceItem,
            }) => (
              <Element key={serviceItem.pagePath} name={serviceItem.pagePath} style={{ width: '100%' }}>
                <ServiceItem {...serviceItem} onHeaderPress={onListItemPress} />
              </Element>
            ))
          }
        </Element>
        <div style={styles.map}>
          {
            typeof window !== 'undefined' && (
              <Map center={mapCenter} zoom={ZOOM} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                  edges.map(({
                    node: { coordinates: { lat, lng }, name, pagePath }
                  }) => (
                    <ExtendedMarker
                      key={pagePath}
                      isOpen={pagePath === selectedServiceId}
                      position={[lat, lng]}
                      onClick={() => onMarkerPress({ pagePath })}
                    >
                      <Popup>
                        {name}
                      </Popup>
                    </ExtendedMarker>
                  ))
                }
              </Map>
            )
          }
        </div>
      </div>
    </div>
  )
}
