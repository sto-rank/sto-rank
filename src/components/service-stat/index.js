import { Progress, Table } from 'antd'
import React, { useMemo } from 'react'
import plural from 'plural-ru'

import { calcRank, calcSolveCustomerClaimsPercentage, MAX_RANK, rankToColor } from '../../helpers/rank'
import ColoredText from '../../components/ColoredText'

import RankBlockTitle from './RankBlockTitle'

import styles from './styles'

const REQUIRED_SIDE_SERVICES = [
  'Vse STO',
  'Google Maps'
];

const ServiceStat = ({
  website,
  rank,
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
  const color = useMemo(() => !incomplete ? rankToColor(rank) : 'gray', [rank, incomplete]);
  const sideServicesRankToRender = useMemo(() => {
    const requiredSideServicesNotFound = REQUIRED_SIDE_SERVICES.filter(o => !sideServicesRank.find(oo => oo.name === o));
    return [
      ...sideServicesRank,
      ...requiredSideServicesNotFound.map(o => ({
        name: o,
        rank: null,
        link: null,
        reviewsAmount: null,
      }))
    ]
  },[sideServicesRank]);

  const rankData = [
    ...(
      !hideRank ? [{
        key: 'rank',
        title: <RankBlockTitle style={{ fontSize: titleFontSize }} title="Итоговый рейтинг СТО" strong description="Мы собираем данные по атосервису представленые в открытых источних и анлизируем их по различным факторам, на основе чего, выводим наш собственный рейтинг автосервиса" />,
        value: (
          <Progress
            strokeLinecap="square"
            strokeWidth={10}
            type="circle"
            percent={rank / MAX_RANK * 100}
            width={50}
            format={() => <b style={{ color }}>{rank !== '0' ? rank : '?'}</b>}
            strokeColor={color}
          />
        ),
        color: 'yellow',
      }] : []
    ),
      ...(solveCustomerClaimsPercentage === -1 ? [] : [{
      key: 'feedbackWithClientsDirection',
      title: <RankBlockTitle style={{ fontSize: titleFontSize }} title="Решение спорных ситуаций" description="Как часто представители автосервиса реагируют и решают спорные ситуации с клиентами. Эта информация собирается с сайтов отзовиков" />,
      value: <span css={styles.ratingValue} style={{ fontSize: valueFontSize }}>
        {solveCustomerClaimsPercentage > 0 ? <ColoredText type="safe" strong>{calcSolveCustomerClaimsPercentage({ percentage: solveCustomerClaimsPercentage})}%</ColoredText> : null}
        {solveCustomerClaimsPercentage === -1 ? <ColoredText disabled strong>Нет данных</ColoredText> : null}
        {solveCustomerClaimsPercentage === 0 ? <ColoredText type="danger" strong>Никогда</ColoredText> : null}
      </span>,
      color: rowColor,
    }]),
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
    ...sideServicesRankToRender.map(o => ({
      key: JSON.stringify(o),
      title: <RankBlockTitle style={{ fontSize: titleFontSize }} title={<a href={o.link} target="_blank">Рейтинг <span>{o.name}</span></a>} />,
      value: (
        <span css={styles.ratingValue} style={{ fontSize: valueFontSize }}>
          <b style={{ color: rankToColor(o.rank) }}>
            {
              o.rank !== null ? <>
                <span css={styles.rankValue}>
                  {parseFloat(o.rank).toFixed(1)}</span> <span css={styles.reviewsAmount}><a href={o.link} target="_blank">({o.reviewsAmount} {plural(o.reviewsAmount, 'отзыв', 'отзыва', 'отзывов')})</a>
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
