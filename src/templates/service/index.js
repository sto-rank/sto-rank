import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { List, Table, Icon, Button } from 'antd';
import { Map, TileLayer, Popup, Marker } from 'react-leaflet'

import { calcRank, rankToStatus, rankToColor } from '../../helpers/rank'
import ColoredText from '../../components/ColoredText'

import styles from './styles'
import RankBlockTitle from './RankBlockTitle'
import { mapDayToLabel } from '../../helpers/days'
import useEnchancedServices from '../../hooks/useEnchancedServices'
import ExtendedMarker from '../../components/extended-marker'
import { MOBILE_DEVICE_LAYOUT_TRASHOLD } from '../../constants/layout'

const ZOOM = 15;

export default function Service(ar) {

  const { data: { servicesJson } } = ar
  const enchancedServices = useEnchancedServices({ serviceItems: [servicesJson] });

  const {
    name,
    coordinates,
    mainSpecialties,
    otherSpecialties,
    sideServicesRank,
    fakeReviews,
    feedbackWithClientsDirection,
    forumReviewsDirection,
    address,
    phones,
    workingHours,
    website,
    incomplete,
  } = enchancedServices[0];

  const rank = useMemo(() => calcRank({
    fakeReviews,
    feedbackWithClientsDirection,
    forumReviewsDirection,
    sideServicesRank,
  }), [fakeReviews, feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank]);
  const rankData = useMemo(() => [
    {
      title: <RankBlockTitle css={styles.ourRatingTitleStyle} title="Итоговый рейтинг СТО" strong description="Мы собираем данные по атосервису представленые в открытых источних и анлизируем их по различным факторам, на основе чего, выводим наш собственный рейтинг автосервиса" />,
      value: (
        <span css={styles.ratingValue} style={{ color: !incomplete ? rankToColor(rank) : 'gray' }} css={styles.ourRatingValueStyle}>
          {rank}
        </span>
      ),
    },
    {
      title: <RankBlockTitle title="Решение спорных ситуаций" description="Как часто представители автосервиса реагируют и решают спорные ситуации с клиентами. Эта информация собирается с сайтов отзовиков" />,
      value: <span css={styles.ratingValue}>
        {feedbackWithClientsDirection === 2 && <ColoredText type="safe" strong>Всегда</ColoredText>}
        {feedbackWithClientsDirection === 1 && <ColoredText type="warning" strong>Выборочно</ColoredText>}
        {feedbackWithClientsDirection === 0 && <ColoredText type="danger" strong>Никогда</ColoredText>}
        {feedbackWithClientsDirection === -1 && <ColoredText disabled strong>Нет данных</ColoredText>}
      </span>,
    },
    {
      title: <RankBlockTitle title="Отзывы авторитетных пользователей на форумах" description="Мы ищем отзывы от авторитетных пользователей на различных тематических форумах, таких как toyota-club.com.ua, drive2.ru и тд." />,
      value: <span css={styles.ratingValue}>
        {forumReviewsDirection === 2 && <ColoredText type="safe" strong>Положительные</ColoredText>}
        {forumReviewsDirection === 1 && <ColoredText type="warning" strong>Смешанные</ColoredText>}
        {forumReviewsDirection === 0 && <ColoredText type="danger" strong>Отрицательные</ColoredText>}
        {forumReviewsDirection === -1 && <ColoredText disabled strong>Отсутсвуют</ColoredText>}
      </span>,
    },
    {
      title: <RankBlockTitle title="Накрутка положительных отзывов" description="Мы анализируем отзывы о сервисе на популярых сайтах-отзовиках по таким криетриям как релевантность комментария, дата создания аккаунта, время публикации отзыва и интервалы между публикациями и тд." />,
      value: <span css={styles.ratingValue}>
        {
          fakeReviews ? (
            <ColoredText type="danger" strong>Обнаружена</ColoredText>
          ) : (
            <ColoredText type="safe" strong>Отсутсвует</ColoredText>
          )
        }
      </span>,
    },
    ...sideServicesRank.map(o => ({
          title: <RankBlockTitle title={<a href={o.link} target="_blank">Рейтинг <span>{o.name}</span></a>} />,
          value: <span css={styles.ratingValue}><ColoredText type={rankToStatus(o.rank)} strong>{o.rank}</ColoredText></span>
    }))
  ], [servicesJson]);

  const rankColumns = useMemo(() => [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    }
  ], []);

  return (
    <div style={styles.container}>
      <h1 css={styles.title}>
        <div style={styles.titleText}>{name}</div>
      </h1>
      <div css={styles.content}>
        <div css={[styles.contentSide, styles.rankBlock ]}>
          <div>
            <a style={styles.goBack} href="/services"><Button type="link"><Icon type="left" />Назад к списку</Button></a>
          </div>
          <div css={[styles.listWrapper, styles.rankListWrapper]}>
            {
              incomplete && (
                <p style={styles.textUnderTable}>По данному автосервису нет достаточно информации для точной оценки!</p>
              )
            }
            <Table dataSource={rankData} columns={rankColumns} showHeader={false} pagination={false} />
          </div>
        </div>
        <div css={[styles.contentSide, styles.servicesBlock]}>
          <section style={styles.addressBlock}>
            <h3 className="list-heading">Вебсайт:</h3>
            <div>
              <a href={website} rel="noopener noreferrer" target="_blank">{website}</a>
            </div>
          </section>
          <section>
            <h3 className="list-heading">Телефоны для связи:</h3>
            <div style={{ ...styles.listWrapper, ...styles.listWithoutBorder }}>
              <List
                dataSource={phones}
                renderItem={item => (
                  <List.Item style={styles.listItemWithoutBorder}>
                    {item}
                  </List.Item>
                )}
              />
            </div>
          </section>
          <section>
            <h3 className="list-heading">Время работы:</h3>
            <div>
              <div style={{ ...styles.listWrapper, ...styles.listWithoutBorder }}>
                <List
                  dataSource={workingHours}
                  renderItem={({ day, time }) => (
                    <List.Item style={styles.listItemWithoutBorder}>
                      {mapDayToLabel(day)}: <b>{time}</b>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </section>
          <section style={styles.addressBlock}>
            <h3 className="list-heading">Адрес:</h3>
            <div>
              {address}
            </div>
          </section>
          <div style={styles.specialtiesBlock}>
            <section>
              <h3 className="list-heading">Основные виды работ:</h3>
              <div style={styles.listWrapper}>
                <List
                  dataSource={mainSpecialties}
                  renderItem={item => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              </div>
            </section>
            <section>
              <h3 className="list-heading">Так же выполняют:</h3>
              <div style={styles.listWrapper}>
                <List
                  dataSource={otherSpecialties}
                  renderItem={item => (
                    <List.Item>
                      {item}
                    </List.Item>
                  )}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      <div style={styles.map}>
        {
          typeof window !== 'undefined' && (
            <Map center={coordinates} zoom={ZOOM} style={{ height: 250 }}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ExtendedMarker
                isOpen
                position={coordinates}
              >
                <Popup>
                  {name} <br /> {address}
                </Popup>
              </ExtendedMarker>
            </Map>
          )
        }
      </div>
    </div>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    servicesJson(pagePath: { eq: $path }) {
      name
      description
      phones
      coordinates {
        lat
        lng
      }
      address
      workingHours {
        day
        time
      }
      website
      mainSpecialties
      otherSpecialties
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
`
