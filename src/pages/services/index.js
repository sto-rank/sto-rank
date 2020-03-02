import React, { useCallback, useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Tabs, Icon } from 'antd';
import Media from 'react-media';

import styles from '../../components/services/styles'
import useEnchancedServices from '../../hooks/useEnchancedServices'
import { AUTOMATIC_TRANSMISSION_REPAIR } from '../../constants/specialized-keywords'
import ServicesList from '../../components/services/services-list'
import Map from '../../components/services/map'
import { MOBILE_DEVICE_LAYOUT_TRASHOLD } from '../../constants/layout'

const { TabPane } = Tabs;

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

  const selectedService = useMemo(() => filteredEnchancedServiceItems.find(o => o.pagePath === selectedServiceId), [filteredEnchancedServiceItems, selectedServiceId]);

  const onServicePress = useCallback(({ pagePath }) => {
    setSelectedServiceId(pagePath);
  }, []);
  const onFilterValuesChange = useCallback((a, b, allValues) => {
    setFilterSorting(allValues)
  }, []);

  const servicesList = useMemo(() => (
    <ServicesList
      filteredEnchancedServiceItems={filteredEnchancedServiceItems}
      onFilterValuesChange={onFilterValuesChange}
      selectedServiceId={selectedServiceId}
      onListItemPress={onServicePress}
    />
  ), [filteredEnchancedServiceItems, onFilterValuesChange, selectedServiceId, onServicePress]);
  const map = useMemo(() => (
    <Map
      selectedService={selectedService}
      selectedServiceId={selectedServiceId}
      onMarkerPress={onServicePress}
      filteredEnchancedServiceItems={filteredEnchancedServiceItems}
    />
  ), [filteredEnchancedServiceItems, selectedServiceId, selectedService, onServicePress]);

  return (
    <div>
      <div css={styles.container}>
        <Media query={`(max-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD}px)`} render={() =>
          (
            <Tabs tabPosition="bottom" size="large">
              <TabPane tab={<div><Icon type="unordered-list" />Список СТО</div>} key="1">
                {servicesList}
              </TabPane>
              <TabPane tab={<div><Icon type="global" />Карта</div>} key="2">
                {map}
              </TabPane>
            </Tabs>
          )}
        />
        <Media query={`(min-width: ${MOBILE_DEVICE_LAYOUT_TRASHOLD + 1}px)`} render={() =>
          (
            <>
              {servicesList}
              {map}
            </>
          )}
        />
      </div>
    </div>
  )
}
