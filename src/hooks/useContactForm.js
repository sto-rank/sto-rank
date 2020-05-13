import { useCallback, useMemo, useState } from 'react'

const useContactForm = ({ services }) => {
  const [contactServiceId, setContactServiceId] = useState();

  const onContactServiceCancel = useCallback(() => {
    setContactServiceId('');
  }, []);
  const onContactServicePress = useCallback(({ pagePath }) => {
    setContactServiceId(pagePath);
  }, []);

  const contactService = useMemo(() => services.find(o => contactServiceId && contactServiceId.includes(o.pagePath)), [services, contactServiceId]);

  return { contactServiceId, onContactServiceCancel, onContactServicePress, contactService }
}

export default useContactForm;