import React, { useEffect, useRef } from 'react'
import { Marker } from 'react-leaflet'

export default (props) => {
  const { isOpen } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) ref.current.leafletElement.openPopup();
  }, [isOpen]);

  return <Marker ref={ref} {...props} />
}
