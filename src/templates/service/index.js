import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { List, Table } from 'antd';
import { Map, TileLayer, Popup, Marker } from 'react-leaflet'

import { calcRank, rankToStatus } from '../../helpers/rank'
import ColoredText from '../../components/ColoredText'

import styles from './styles'
import RankBlockTitle from './RankBlockTitle'
import { mapDayToLabel } from '../../helpers/days'

const ZOOM = 15;

export default function Service({ data: { servicesJson } }) {
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
  } = servicesJson;

  const rank = useMemo(() => calcRank({
    fakeReviews,
    feedbackWithClientsDirection,
    forumReviewsDirection,
    sideServicesRank: sideServicesRank.map(o => o.rank),
  }), [fakeReviews, feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank]);

  const rankData = useMemo(() => [
    {
      title: <RankBlockTitle style={styles.ourRatingTitleStyle} title="Итоговый рейтинг СТО" strong description="Мы собираем данные по атосервису представленые в открытых источних и анлизируем их по различным факторам, на основе чего, выводим наш собственный рейтинг автосервиса" />,
      value: <ColoredText style={styles.ourRatingValueStyle} type={rankToStatus(rank)} strong>{rank}</ColoredText>,
    },
    {
      title: <RankBlockTitle title="Решение спорных ситуаций" description="Как часто представители автосервиса реагируют и решают спорные ситуации с клиентами. Эта информация собирается с сайтов отзовиков" />,
      value: <>
        {feedbackWithClientsDirection === 2 && <ColoredText type="safe" strong>Всегда</ColoredText>}
        {feedbackWithClientsDirection === 1 && <ColoredText type="warning" strong>Выборочно</ColoredText>}
        {feedbackWithClientsDirection === 0 && <ColoredText type="danger" strong>Никогда</ColoredText>}
        {feedbackWithClientsDirection === -1 && <ColoredText disabled strong>Нет данных</ColoredText>}
      </>,
    },
    {
      title: <RankBlockTitle title="Отзывы авторитетных пользователей на форумах" description="Мы ищем отзывы от авторитетных пользователей на различных тематических форумах, таких как toyota-club.com.ua, drive2.ru и тд." />,
      value: <>
        {forumReviewsDirection === 2 && <ColoredText type="safe" strong>Положительные</ColoredText>}
        {forumReviewsDirection === 1 && <ColoredText type="warning" strong>Смешанные</ColoredText>}
        {forumReviewsDirection === 0 && <ColoredText type="danger" strong>Отрицательные</ColoredText>}
        {forumReviewsDirection === -1 && <ColoredText disabled strong>Отсутсвуют</ColoredText>}
      </>,
    },
    {
      title: <RankBlockTitle title="Накрутка положительных отзывов" description="Мы анализируем отзывы о сервисе на популярых сайтах-отзовиках по таким криетриям как релевантность комментария, дата создания аккаунта, время публикации отзыва и интервалы между публикациями и тд." />,
      value: <>
        {
          fakeReviews ? (
            <ColoredText type="danger" strong>Обнаружена</ColoredText>
          ) : (
            <ColoredText type="safe" strong>Отсутсвует</ColoredText>
          )
        }
      </>,
    },
    ...sideServicesRank.map(o => ({
          title: <RankBlockTitle title={<span>Рейтинг <span>{o.name}</span></span>} />,
          value: <ColoredText type={rankToStatus(o.rank)} strong>{o.rank}</ColoredText>
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
      <h1 style={styles.title}>
        <div style={styles.titleText}>{name}</div>
      </h1>
      <div style={styles.content}>
        <div style={{ ...styles.contentSide}}>
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
        <div style={{ ...styles.contentSide, ...styles.rankBlock }}>
          <div style={{ ...styles.listWrapper, ...styles.rankListWrapper }}>
            <Table dataSource={rankData} columns={rankColumns} showHeader={false} pagination={false} />
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
              <Marker position={coordinates} sh>
                <Popup>
                  {name} <br /> {address}
                </Popup>
              </Marker>
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
