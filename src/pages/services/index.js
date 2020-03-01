import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Element, scroller } from 'react-scroll'
import { Map, Popup, TileLayer } from 'react-leaflet'

import ExtendedMarker from '../../components/extended-marker'
import CreateFilterSortingForm from '../../components/services/filter-sorting-form'
import styles from '../../components/services/styles'
import ServiceItem from '../../components/services/service-item'
import useEnchancedServices from '../../hooks/useEnchancedServices'
import { MAX_RANK, rankToColor } from '../../helpers/rank'
import { AUTOMATIC_TRANSMISSION_REPAIR } from '../../constants/specialized-keywords'
import { Col, Icon, Progress } from 'antd'
import { mapDayToLabel } from '../../helpers/days'

const ZOOM = 11
const defaultCenter = [
  50.4851493,
  30.4721233
];

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
  const [filterSorting, setFilterSorting] = useState({});

  const { specialized, search } = filterSorting;
  const enchancedServices = useEnchancedServices({ serviceItems: edges.map(({ node }) => node) });

  const filteredEnchancedServiceItems = enchancedServices.filter(o => {
    return (
      !specialized || o.specialized.includes(AUTOMATIC_TRANSMISSION_REPAIR)
    ) && (
      !search || o.name.toLowerCase().includes(search.toLowerCase())
    )
  })

  const completedEnchancedServiceItems = filteredEnchancedServiceItems
    .filter(o => !o.incomplete)
    .sort((a, b) => {
      return b.rank - a.rank
    });
  const incompletedEnchancedServiceItems = filteredEnchancedServiceItems
    .filter(o => o.incomplete)
    .sort((a, b) => {
      return b.rank - a.rank
    });

  const selectedService = useMemo(() => filteredEnchancedServiceItems.find(o => o.pagePath === selectedServiceId), [filteredEnchancedServiceItems, selectedServiceId]);

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
              <h1><a href="/" style={styles.title}>СТО Киева  <br/> сепциализирующиеся на ремонте АКПП</a></h1>
            </div>
            <div style={styles.actionsBlock}>
              <FilterSortingForm />
            </div>
            {
              completedEnchancedServiceItems.map(serviceItem => (
                <Element key={serviceItem.pagePath} name={serviceItem.pagePath} style={{ width: '100%' }}>
                  <ServiceItem {...serviceItem} onHeaderPress={onListItemPress} />
                </Element>
              ))
            }
            <p style={styles.listSeparator}>Далее представлены автосервисы по которым нет достаточно информации для точной оценки:</p>
            {
              incompletedEnchancedServiceItems.map(serviceItem => (
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
                  filteredEnchancedServiceItems.map(({
                                                       coordinates: { lat, lng },
                                                       name,
                                                       pagePath,
                                                       address,
                                                       rank,
                                                       incomplete,
                                                       workingHours,
                    specialized
                  }) => (
                    <ExtendedMarker
                      key={pagePath}
                      isOpen={pagePath === selectedServiceId}
                      position={[lat, lng]}
                      onClick={() => onMarkerPress({ pagePath })}
                    >
                      <Popup>
                        <p><b style={{ color: !incomplete ? rankToColor(rank) : 'gray' }}>{rank} из {MAX_RANK}</b></p>
                        <p>{ incomplete && <span style={{ ...styles.infoText, ...styles.warningText }}><Icon type="warning" /> По данному автосервису нет достаточно информации для точной оценки!</span>}</p>
                        <p>{ specialized.includes(AUTOMATIC_TRANSMISSION_REPAIR) && <span style={{ ...styles.infoText, ...styles.successText }}><Icon type="check" /> Узкопрофильное СТО по ремонту АКПП</span>}</p>
                        <p><b>{name}</b></p>
                        <p>{address}</p>
                        {
                          workingHours.map(({ day, time }) => <div key={`${day}${time}`}>{mapDayToLabel(day)}, {time}</div>)
                        }
                        <p><a href={pagePath} target="_blank">Детальнее</a></p>
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
