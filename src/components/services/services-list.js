import React, { useMemo, useCallback } from 'react'
import { Pagination, Icon } from 'antd'

import CreateFilterSortingForm from '../../components/services/filter-sorting-form'
import styles from '../../components/services/styles'
import ServiceItem from '../../components/services/service-item'

export default React.memo(function ServicesList({
  services,
  onFilterValuesChange,
                                                  selectedService,
  onListItemPress,
  onContactServicePress,
  setSelectedTab,
  totalServicesItemsLength,
  navigate,
                                                  currentPage,
                                                  onServiceClose,
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

  return (
    <div css={styles.listBlock}>
      <div css={styles.services}>
        <div css={[styles.list, selectedService ? styles.hideBlock : null]}>
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
                <ServiceItem {...serviceItem} key={`${serviceItem.pagePath}`} onHeaderPress={onListItemPress} onContactServicePress={onContactServicePress} setSelectedTab={setSelectedTab} />
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
                <ServiceItem {...serviceItem} key={`${serviceItem.pagePath}`} onHeaderPress={onListItemPress} onContactServicePress={onContactServicePress} setSelectedTab={setSelectedTab} />
              )
            })
          }
          <div css={styles.paginationWrapper}>
            <Pagination current={currentPage + 1} total={totalServicesItemsLength} onChange={onPageChange} />
          </div>
        </div>
        {
          selectedService ? (
            <div css={styles.selectedService}>
              <div css={styles.selectedServiceHeader}>
                <h2 css={styles.selectedServiceTitle}>{selectedService.name} <Icon onClick={onServiceClose} css={styles.closeBtn} type="close" /></h2>
              </div>
              <ServiceItem {...selectedService} onHeaderPress={onListItemPress} onContactServicePress={onContactServicePress} setSelectedTab={setSelectedTab} />
            </div>
          ) : null
        }
      </div>
    </div>
  );
})
