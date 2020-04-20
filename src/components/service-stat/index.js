import { Table } from 'antd'
import React, { useMemo } from 'react'
import plural from 'plural-ru'

import { calcRank, calcSolveCustomerClaimsPercentage, rankToColor } from '../../helpers/rank'
import ColoredText from '../../components/ColoredText'

import RankBlockTitle from './RankBlockTitle'

import styles from './styles'

const ServiceStat = ({
  website,
                  fakeReviews,
                  feedbackWithClientsDirection,
                       solveCustomerClaimsPercentage,
                  forumReviewsDirection,
                  sideServicesRank,
                  incomplete,
                  hideRank,
                  titleFontSize,
                  valueFontSize,
  rowColor,
                  ...rest
                }) => {
  const rank = useMemo(() => calcRank({
    website,
    fakeReviews,
    feedbackWithClientsDirection,
    forumReviewsDirection,
    solveCustomerClaimsPercentage,
    sideServicesRank,
  }), [fakeReviews, feedbackWithClientsDirection, forumReviewsDirection, sideServicesRank]);
  const rankData = [
    ...(
      !hideRank ? [{
        key: 'rank',
        title: <RankBlockTitle style={{ fontSize: titleFontSize }} title="Итоговый рейтинг СТО" strong description="Мы собираем данные по атосервису представленые в открытых источних и анлизируем их по различным факторам, на основе чего, выводим наш собственный рейтинг автосервиса" />,
        value: (
          <span style={{ color: !incomplete && rank !== null ? rankToColor(rank) : 'gray', fontSize: valueFontSize }} css={styles.ratingValue}>
            <b>{rank !== null ? rank : 'Нет данных'}</b>
          </span>
        ),
        color: 'yellow',
      }] : []
    ),
    {
      key: 'feedbackWithClientsDirection',
      title: <RankBlockTitle style={{ fontSize: titleFontSize }} title="Решение спорных ситуаций" description="Как часто представители автосервиса реагируют и решают спорные ситуации с клиентами. Эта информация собирается с сайтов отзовиков" />,
      value: <span css={styles.ratingValue} style={{ fontSize: valueFontSize }}>
        {solveCustomerClaimsPercentage > 0 && <ColoredText type="safe" strong>{calcSolveCustomerClaimsPercentage({ percentage: solveCustomerClaimsPercentage})}%</ColoredText>}
        {solveCustomerClaimsPercentage === -1 && <ColoredText disabled strong>Нет данных</ColoredText>}
        {solveCustomerClaimsPercentage === 0 && <ColoredText type="danger" strong>Никогда</ColoredText>}
      </span>,
      color: rowColor,
    },
    // {
    //   key: 'forumReviewsDirection',
    //   title: <RankBlockTitle title="Отзывы авторитетных пользователей на форумах" description="Мы ищем отзывы от авторитетных пользователей на различных тематических форумах, таких как toyota-club.com.ua, drive2.ru и тд." />,
    //   value: <span css={styles.ratingValue}>
    //     {forumReviewsDirection === 2 && <ColoredText type="safe" strong>Положительные</ColoredText>}
    //     {forumReviewsDirection === 1 && <ColoredText type="warning" strong>Смешанные</ColoredText>}
    //     {forumReviewsDirection === 0 && <ColoredText type="danger" strong>Отрицательные</ColoredText>}
    //     {forumReviewsDirection === -1 && <ColoredText disabled strong>Отсутсвуют</ColoredText>}
    //   </span>,
    // },
    {
      key: 'fakeReviews',
      title: <RankBlockTitle style={{ fontSize: titleFontSize }} title="Накрутка положительных отзывов" description="Мы анализируем отзывы о сервисе на популярых сайтах-отзовиках по таким криетриям как релевантность комментария, дата создания аккаунта, время публикации отзыва и интервалы между публикациями и тд." />,
      value: <span css={styles.ratingValue} style={{ fontSize: valueFontSize }}>
        {
          fakeReviews ? (
            <ColoredText type="danger" strong>Обнаружена</ColoredText>
          ) : (
            <ColoredText type="safe" strong>Отсутсвует</ColoredText>
          )
        }
      </span>,
      color: rowColor,
    },
    ...sideServicesRank.map(o => ({
      key: JSON.stringify(o),
      title: <RankBlockTitle style={{ fontSize: titleFontSize }} title={<a href={o.link} target="_blank">Рейтинг <span>{o.name}</span></a>} />,
      value: (
        <span css={styles.ratingValue} style={{ fontSize: valueFontSize }}>
          <b style={{ color: rankToColor(o.rank) }}>
            {
              o.rank !== null ? <>
                <span css={styles.rankValue}>
                  {o.rank.toFixed(1)}</span> <span css={styles.reviewsAmount}><a href={o.link} target="_blank">({o.reviewsAmount} {plural(o.reviewsAmount, 'отзыв', 'отзыва', 'отзывов')})</a>
                </span>
              </> : 'Нет данных'
            }
          </b>
        </span>
      ),
      color: rowColor,
    }))
  ];

  const rankColumns = useMemo(() => [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render(text, record) {
        return {
          props: {
            style: {
              background: record.color,
              paddingTop: 10,
              paddingBottom: 10,
            },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render(text, record) {
        return {
          props: {
            style: {
              background: record.color,
              paddingTop: 10,
              paddingBottom: 10,
            },
          },
          children: <div>{text}</div>,
        };
      },
    }
  ], []);

  return <Table
    {...rest}
    dataSource={rankData}
    columns={rankColumns}
    showHeader={false}
    pagination={false}
  />;
}

export default React.memo(ServiceStat);
