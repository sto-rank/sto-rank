import React, { useEffect, useMemo, useCallback } from 'react'
import { Element, scroller } from 'react-scroll'
import { Link } from '@reach/router'
import { Pagination } from 'antd'

import CreateFilterSortingForm from '../../components/services/filter-sorting-form'
import styles from '../../components/services/styles'
import ServiceItem from '../../components/services/service-item'

export default React.memo(function ServicesList({
  services,
  onFilterValuesChange,
  selectedServiceId,
  onListItemPress,
  onContactServicePress,
  setSelectedTab,
  totalServicesItemsLength,
  navigate,
                                                  currentPage,
}) {
  const completedServices = services
    .filter(o => !o.incomplete)
    .sort((a, b) => {
      return b.rank - a.rank
    });
  const incompletedServices = services
    .filter(o => o.incomplete)
    .sort((a, b) => {
      return b.rank - a.rank
    });

  const FilterSortingForm = useMemo(() => CreateFilterSortingForm({ onValuesChange: onFilterValuesChange }), [onFilterValuesChange]);

  const onPageChange = useCallback((page) => {
    navigate(`/kyiv/remont-akpp${page === 1 ? '' : '/' + page}`)
  }, []);

  useEffect(() => {
    scroller.scrollTo(selectedServiceId, { containerId: 'servicesList', smooth: true })
  }, [selectedServiceId]);

  return (
    <div css={styles.listBlock}>
      <Element css={styles.services} id="servicesList">
        <div css={styles.header}>
          <h1><a href="/" css={styles.title}>СТО Киева  <br/> сепциализирующиеся на ремонте АКПП</a></h1>
        </div>
        <div css={styles.actionsBlock}>
          <FilterSortingForm />
        </div>
        {
          completedServices.map(serviceItem => {
            const firstPoint = serviceItem.points.find(o => o.coordinates);
            return (
              <Element key={`${serviceItem.pagePath}`} name={`${serviceItem.pagePath}${firstPoint ? firstPoint.address : undefined}`} css={styles.scrollItem}>
                <ServiceItem {...serviceItem} onHeaderPress={onListItemPress} onContactServicePress={onContactServicePress} setSelectedTab={setSelectedTab} />
              </Element>
            )
          })
        }
        {
          incompletedServices.length ? (
            <p css={styles.listSeparator}>Далее представлены автосервисы по которым нет достаточно информации для точной оценки:</p>
          ) : null
        }
        {
          incompletedServices.map(serviceItem => {
            const firstPoint = serviceItem.points.find(o => o.coordinates);
            return (
              <Element key={`${serviceItem.pagePath}`} name={`${serviceItem.pagePath}${firstPoint ? firstPoint.address : undefined}`} css={styles.scrollItem}>
                <ServiceItem {...serviceItem} onHeaderPress={onListItemPress} onContactServicePress={onContactServicePress} setSelectedTab={setSelectedTab} />
              </Element>
            )
          })
        }
        <Pagination current={currentPage + 1} total={totalServicesItemsLength} onChange={onPageChange} />
      </Element>
    </div>
  );
})
