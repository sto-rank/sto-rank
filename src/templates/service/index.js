import React from 'react'
import { graphql } from 'gatsby'

export default function Service({ data }) {
  const { servicesJson } = data
  const { name, coordinates } = servicesJson
  return (
    <div className="blog-post">
      <h1>{name}</h1>
      <h1>{coordinates}</h1>
    </div>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    servicesJson(pagePath: { eq: $path }) {
      name
      coordinates
    }
  }
`
