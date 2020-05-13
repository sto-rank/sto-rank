import React, { useMemo, useCallback, useEffect, useRef } from 'react'
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

  const scrollRef = useRef(null);

  const FilterSortingForm = useMemo(() => CreateFilterSortingForm({ onValuesChange: onFilterValuesChange }), [onFilterValuesChange]);

  const onPageChange = useCallback((page) => {
    navigate(`/kyiv/remont-akpp${page === 1 ? '' : '/' + page}`)
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTop = 0;
  }, [currentPage])

  return (
    <div css={styles.listWrapper}>
      <div css={styles.listBlock}>
        <div css={styles.services} ref={scrollRef}>
          <div css={[styles.list, selectedService ? styles.hideBlock : null]}>
            <div css={styles.header}>
              <h1><a href="/" css={styles.title}>СТО Киева  <br/> сепциализирующиеся на ремонте АКПП</a></h1>
            </div>
            <div css={styles.actionsBlock}>
              <FilterSortingForm />
            </div>
            {
              completedServices.map(serviceItem => {
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
                return (
                  <ServiceItem {...serviceItem} key={`${serviceItem.pagePath}`} onHeaderPress={onListItemPress} onContactServicePress={onContactServicePress} setSelectedTab={setSelectedTab} />
                )
              })
            }
            <div css={styles.paginationWrapper}>
              <Pagination current={currentPage + 1} total={totalServicesItemsLength} onChange={onPageChange} />
            </div>

            {
              currentPage === 0 ? (
                <>
                  <div css={styles.bottomText}>
                    <p><b>STO-RANK</b> - уникальный агрегатор СТО не имеющий конкурентов, где
                      анализ СТО происходит благодаря искусственному интеллекту без вмешательства человека. Оценка сервиса
                      состоит с комплекса факторов, где качество каждой выполненной работы, реакция представителей СТО на
                      спорные ситуации или общее отношение к клиентам лишь малая её часть. В отличии от конкурентов STO-RANK
                      анализирует отзывы всех популярных сайтов и профильных форумов исключая накрутку отзывов благодаря
                      проверенным алгоритмам.</p>
                    <ul>
                      <li>Самый полный список всех СТО</li>
                      <li>Уникальный рейтинг без человеческого фактора</li>
                      <li>Без накрутки и купленных отзывов</li>
                      <li>Удобная карта для поиска СТО поблизости</li>
                      <li>Удобная мобильная версия сайта</li>
                      <li>Окно для быстрой записи на СТО в удобное Вам время</li>
                    </ul>
                    <p>Каждый день мы работаем над усовершенствованием алгоритма и расширением нашего списка СТО. Удобная
                      мобильная версия сайта поможет всегда найти СТО поблизости, а запись на СТО происходит в пару кликов,
                      оставив Ваш номер телефона и удобное время. В будущем так же в разработке предусмотрена система скидок и
                      реферальных программ.</p>
                  </div>
                  <div css={styles.bottomText}>
                    <p>
                      В данном разделе представлен самый широкий список СТО по таким услугам, как:
                    </p>
                    <ul>
                      <li>ремонт и диагностика АКПП</li>
                      <li>ремонт и диагностика DSG</li>
                      <li>ремонт и замена вариатора</li>
                    </ul>
                    Для удобности пользования так же есть фильтр СТО, которые специализируются исключительно на диагностике и ремонте ходовой. На сайте представлена подробная информация на основе отзывов самых популярных сайтов и форумов, контакты и сайт СТО.

                    Уникальный рейтинг сайта не имеет аналогов и рассчитывается благодаря алгоритмам на основе десятков показателей, включая качество выполненных работ, только реальных отзывов клиентов и реакции представителей СТО на спорные ситуации.

                    Для удобности Вы можете воспользоваться окном быстрой записи, указав номер телефона и удобное время для визита СТО. Наши операторы свяжутся Вами подтвердить запись.
                  </div>
                </>
              ) : null
            }
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
    </div>
  );
})
