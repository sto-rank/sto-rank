import React, { useEffect, useRef } from 'react'
import { Marker } from 'react-leaflet'

export default React.memo((props) => {
  const { isOpen } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) ref.current.leafletElement.openPopup();
    else ref.current.leafletElement.closePopup();
  }, [isOpen]);

  return <Marker ref={ref} {...props} />
})
