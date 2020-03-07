import React, { useEffect, useMemo } from 'react'
import { Element, scroller } from 'react-scroll'
import CreateFilterSortingForm from '../../components/services/filter-sorting-form'
import styles from '../../components/services/styles'
import ServiceItem from '../../components/services/service-item'

export default function ServicesList({
  filteredEnchancedServiceItems,
  onFilterValuesChange,
  selectedServiceId,
  onListItemPress,
  onContactServicePress,
}) {
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

  const FilterSortingForm = useMemo(() => CreateFilterSortingForm({ onValuesChange: onFilterValuesChange }), [onFilterValuesChange]);

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
          completedEnchancedServiceItems.map(serviceItem => (
            <Element key={serviceItem.pagePath} name={serviceItem.pagePath} css={styles.scrollItem}>
              <ServiceItem {...serviceItem} onHeaderPress={onListItemPress} onContactServicePress={onContactServicePress} />
            </Element>
          ))
        }
        <p css={styles.listSeparator}>Далее представлены автосервисы по которым нет достаточно информации для точной оценки:</p>
        {
          incompletedEnchancedServiceItems.map(serviceItem => (
            <Element key={serviceItem.pagePath} name={serviceItem.pagePath} css={styles.scrollItem}>
              <ServiceItem {...serviceItem} onHeaderPress={onListItemPress} onContactServicePress={onContactServicePress} />
            </Element>
          ))
        }
      </Element>
    </div>
  );
}
