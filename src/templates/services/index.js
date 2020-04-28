import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Tabs, Icon } from 'antd';

import styles from '../../components/services/styles'
import { AUTOMATIC_TRANSMISSION_REPAIR } from '../../constants/specialized-keywords'
import ServicesList from '../../components/services/services-list'
import Map from '../../components/services/map'
import ContactForm from '../../components/contact-form'
import { MOBILE_DEVICE_LAYOUT_TRASHOLD } from '../../constants/layout'

import {
  Router,
  Link,
  createHistory,
  LocationProvider
} from '@reach/router'


const Provider = ({ children }) => typeof window !== 'undefined' ? <LocationProvider history={createHistory(window)}>{children}</LocationProvider> : <>{children}</>

const Page = (props) => {
  const { services, navigate, page, limit } = props;

  const currentPage = (!page ? 1 : page) - 1;

  const skip = currentPage * limit;

  const [selectedTab, setSelectedTab] = useState('servicesList');
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [contactServiceId, setContactServiceId] = useState();
  const [filterSorting, setFilterSorting] = useState({});
  const [isMobile, setIsMobile] = useState(null);

  const { specialized, search } = filterSorting;

  const servicesToRender = useMemo(() => {
    return services.filter(o => {
      return o.sideServicesRank.length && (
        !specialized || o.specialized.includes(AUTOMATIC_TRANSMISSION_REPAIR)
      ) && (
        !search || o.name.toLowerCase().includes(search.toLowerCase())
      )
    }).slice(skip, skip + limit)
  }, [currentPage, services, specialized, search]);
  const selectedService = useMemo(() => services.find(o => selectedServiceId && selectedServiceId.includes(o.pagePath)), [servicesToRender, selectedServiceId]);
  const contactService = useMemo(() => services.find(o => contactServiceId && contactServiceId.includes(o.pagePath)), [servicesToRender, contactServiceId]);


  const onServicePress = useCallback(({ pagePath, address }) => {
    setSelectedServiceId(`${pagePath}${address}`);
  }, []);
  const onServiceClose = useCallback(() => {
    setSelectedServiceId(null);
  }, []);
  const onContactServicePress = useCallback(({ pagePath }) => {
    setContactServiceId(pagePath);
  }, []);
  const onContactServiceCancel = useCallback(() => {
    setContactServiceId('');
  }, []);
  const onFilterValuesChange = useCallback((a, b, allValues) => {
    setFilterSorting(allValues)
  }, []);

  const servicesList = useMemo(() => (
    <ServicesList
      services={servicesToRender}
      onFilterValuesChange={onFilterValuesChange}
      selectedService={selectedService}
      onListItemPress={onServicePress}
      onContactServicePress={onContactServicePress}
      setSelectedTab={setSelectedTab}
      totalServicesItemsLength={services.length}
      navigate={navigate}
      currentPage={currentPage}
      onServiceClose={onServiceClose}
    />
  ), [servicesToRender, onFilterValuesChange, selectedServiceId, onServicePress, onContactServicePress]);
  const map = useMemo(() => (
    <Map
      selectedService={selectedService}
      selectedServiceId={selectedServiceId}
      onMarkerPress={onServicePress}
      onPopupClose={onServiceClose}
      services={services}
      onContactServicePress={onContactServicePress}
    />
  ), [servicesToRender, selectedServiceId, selectedService, onServicePress]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.innerWidth <= MOBILE_DEVICE_LAYOUT_TRASHOLD) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [typeof window === 'undefined']);

  return (
    <>
      <ContactForm selectedServiceName={contactService ? contactService.name : undefined} onCancel={onContactServiceCancel} />
      {
        isMobile === null || !isMobile ? (
          <div css={styles.container}>
            {servicesList}
            {map}
          </div>
        ) : null
      }
      {
        isMobile === null || isMobile ? (
          <div css={styles.mobileContainer}>
            <Tabs tabPosition="bottom" size="large" activeKey={selectedTab} onChange={setSelectedTab}>
              <TabPane tab={<div><Icon type="unordered-list" />Список СТО</div>} key="servicesList">
                {servicesList}
              </TabPane>
              <TabPane tab={<div><Icon type="global" />Карта</div>} key="map">
                {map}
              </TabPane>
            </Tabs>
          </div>
        ) : null
      }
    </>
  )
}

const { TabPane } = Tabs;

export default function Services(props) {
  const { pageContext: { data: { services }, requestedPage, limit } } = props;
  return (
    <div>
      <Provider>
        <Router>
          <Page path="/kyiv/remont-akpp/*page" services={services} requestedPage={requestedPage} limit={limit} />
        </Router>
      </Provider>
    </div>
  )
}

// export const pageQuery = graphql`
//   query {
//     services {
//       services {
//         specialized
//         specialties
//         pagePath
//         name
//         description
//         website
//         points {
//           address
//           title
//           phones
//           coordinates
//           workingHours {
//             day
//             time {
//               from
//               to
//             }
//           }
//         }
//         sideServicesRank {
//           name
//           link
//           rank
//           reviewsAmount
//         }
//         fakeReviews
//         feedbackWithClientsDirection
//         solveCustomerClaimsPercentage
//         forumReviewsDirection
//         sideForumsMentions {
//           link
//           textNodes {
//             messages
//             text
//           }
//         }
//       }
//     }
//   }
// `

