import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import styles from './styles'

const ZOOM = 15
const coordinates = [
  50.4851493,
  30.4721233
]

export default function Services() {
  const { allServicesJson: { edges } } = useStaticQuery(graphql`
    {
      allServicesJson {
        edges {
          node {
            name
            pagePath
          }
        }
      }
    }
  `);
  return (
    <div style={styles.container}>
      <div style={styles.services}>
        <h1>Services</h1>
        {
          edges.map(({ node: { name, pagePath } }) => (
            <div key={name}>
              <Link to={pagePath}>{name}</Link>
            </div>
          ))
        }
      </div>
      <div style={styles.map}>
        {
          typeof window !== 'undefined' && (
            <Map center={coordinates} zoom={ZOOM} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={coordinates}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </Map>
          )
        }
      </div>
    </div>
  )
}
