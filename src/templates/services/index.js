import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Tabs, Icon } from 'antd';
import {
  Router,
  createHistory,
  LocationProvider
} from '@reach/router'

import styles from '../../components/services/styles'
import useContactForm from '../../hooks/useContactForm'
import { AUTOMATIC_TRANSMISSION_REPAIR } from '../../constants/specialized-keywords'
import SEO from '../../components/seo'
import ServicesList from '../../components/services/services-list'
import Map from '../../components/services/map'
import ContactForm from '../../components/contact-form'
import { MOBILE_DEVICE_LAYOUT_TRASHOLD } from '../../constants/layout'
import { Helmet } from 'react-helmet'

const Provider = ({ children }) => typeof window !== 'undefined' ? <LocationProvider history={createHistory(window)}>{children}</LocationProvider> : <>{children}</>

const Page = (props) => {
  const { services, navigate, page, limit } = props;

  const currentPage = (!page ? 1 : page) - 1;

  const skip = currentPage * limit;

  const [selectedTab, setSelectedTab] = useState('servicesList');
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [filterSorting, setFilterSorting] = useState({});
  const [isMobile, setIsMobile] = useState(null);
  const [wasMounted, setWasMounted] = useState(false);

  const { specialized, search, specializationSearch } = filterSorting;

  const filteredServices = useMemo(() => services.filter(o => {
    return o.sideServicesRank.length && (
      !specialized || o.specialized.includes(AUTOMATIC_TRANSMISSION_REPAIR)
    ) && (
      !search || o.name.toLowerCase().includes(search.toLowerCase())
    ) && (
      !specializationSearch || specializationSearch.length < 3 || o.specialties.find(speciality => speciality.toLowerCase().includes(specializationSearch.toLowerCase()))
    )
  }), [services, specialized, search, specializationSearch])

  const servicesToRender = useMemo(() => {
    return filteredServices.slice(skip, skip + limit)
  }, [skip, limit, filteredServices]);

  const {
    onContactServiceCancel,
    onContactServicePress,
    contactService,
  } = useContactForm({ services: filteredServices });

  const selectedService = useMemo(() => services.find(o => selectedServiceId && selectedServiceId.includes(o.pagePath)), [servicesToRender, selectedServiceId]);

  const onServicePress = useCallback(({ pagePath, address }) => {
    setSelectedServiceId(`${pagePath}${address}`);
  }, []);
  const onServiceClose = useCallback(() => {
    setSelectedServiceId(null);
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
      totalServicesItemsLength={filteredServices.length}
      navigate={navigate}
      currentPage={currentPage}
      onServiceClose={onServiceClose}
      specializationSearch={specializationSearch}
    />
  ), [servicesToRender, onFilterValuesChange, selectedServiceId, onServicePress, onContactServicePress]);
  const map = useMemo(() => (
    <Map
      selectedService={selectedService}
      selectedServiceId={selectedServiceId}
      onMarkerPress={onServicePress}
      onPopupClose={onServiceClose}
      services={filteredServices}
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

  useEffect(() => {
    if (wasMounted) navigate(`/kyiv/remont-akpp`)
  }, [specialized, search]);

  useEffect(() => {
    setWasMounted(true);
  }, [])

  return (
    <>
      <SEO
        title="СТО Киева сепциализирующиеся на ремонте АКПП"
        description="Список СТО по ремонту автоматических коробок передач в Киеве. Определение накрутки отзывов и решение спорных ситуаций"
      />
      <Helmet defer={false}>
        <link rel="canonical" href="/kyiv/remont-akpp" />
      </Helmet>
      {
        isMobile === null || !isMobile ? (
          <div css={styles.container}>
            {servicesList}
            {map}
          </div>
        ) : null
      }
      {
        isMobile !== null && isMobile ? (
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
      <ContactForm selectedServiceName={contactService ? contactService.name : undefined} onCancel={onContactServiceCancel} />
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

