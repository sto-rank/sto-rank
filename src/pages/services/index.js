import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

export default function Services() {
  const { allServicesJson: { edges } } = useStaticQuery(graphql`
    {
      allServicesJson {
        edges {
          node {
            name
            pagePath
            coordinates
          }
        }
      }
    }
  `);
  return (
    <div className="blog-post">
      Services:
      {
        edges.map(({ node: { name, pagePath } }) => (
          <div key={name}>
            <Link to={pagePath}>{name}</Link>
          </div>
        ))
      }
    </div>
  )
}
