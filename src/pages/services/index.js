import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Input, Form } from 'antd'
import { Element, scroller } from 'react-scroll'
import { Map, Popup, TileLayer } from 'react-leaflet'

import ExtendedMarker from '../../components/extended-marker'
import CreateFilterSortingForm from './filter-sorting-form'
import styles from './styles'
import ServiceItem from './service-item'
import useEnchancedServices from './hooks/useEnchancedServices'
import { calcRank } from '../../helpers/rank'

const ZOOM = 11
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
            specialized
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
  const [filterSorting, setFilterSorting] = useState();

  const enchancedServices = useEnchancedServices({ serviceItems: edges.map(({ node }) => node), filterSorting });

  const selectedService = useMemo(() => enchancedServices.find(o => o.pagePath === selectedServiceId), [enchancedServices, selectedServiceId]);

  const mapCenter = useMemo(() => {
    if (selectedService && selectedService.coordinates) {
      const { lat, lng } = selectedService.coordinates;
      return [lat, lng];
    }

    return defaultCenter
  }, [selectedService]);

  const onMarkerPress = useCallback(({ pagePath }) => {
    setSelectedServiceId(pagePath);
  }, []);
  const onListItemPress = useCallback(({ pagePath }) => {
    setSelectedServiceId(pagePath);
  }, []);
  const onFilterValuesChange = useCallback((a, b, allValues) => {
    setFilterSorting(allValues)
  }, []);

  const FilterSortingForm = useMemo(() => CreateFilterSortingForm({ onValuesChange: onFilterValuesChange }), [onFilterValuesChange]);

  useEffect(() => {
    scroller.scrollTo(selectedServiceId, { containerId: 'servicesList', smooth: true })
  }, [selectedServiceId]);

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.listBlock}>
          <Element style={styles.services} id="servicesList">
            <div style={styles.header}>
              <h1 style={styles.title}>СТО Киева  <br/> сепциализирующиеся на ремонте АКПП</h1>
            </div>
            <div style={styles.actionsBlock}>
              <FilterSortingForm />
            </div>
            {
              enchancedServices.map(serviceItem => (
                <Element key={serviceItem.pagePath} name={serviceItem.pagePath} style={{ width: '100%' }}>
                  <ServiceItem {...serviceItem} onHeaderPress={onListItemPress} />
                </Element>
              ))
            }
          </Element>
        </div>
        <div style={styles.map}>
          {
            typeof window !== 'undefined' && (
              <Map center={mapCenter} zoom={ZOOM} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                  enchancedServices.map(({
                    coordinates: { lat, lng }, name, pagePath
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
