import React, { useCallback, useRef, useState } from 'react'
import { Modal, Input } from 'antd';

export default ({ selectedServiceName, onCancel }) => {
  const [status, setStatus] = useState('');
  const formRef = useRef();


  const submitForm = useCallback(() => {
    const form = formRef.current;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus('SUCCESS');
      } else {
        setStatus('ERROR');
      }
    };
    xhr.send(data);
  }, []);

  return (
    <Modal
      title={`Запись на автосервис ${selectedServiceName}`}
      visible={!!selectedServiceName}
      onOk={submitForm}
      onCancel={onCancel}
      okText="Записаться"
      cancelText="Отмена"
    >
      <form
        ref={formRef}
        onSubmit={submitForm}
        action="https://formspree.io/xqkbnpbw"
        method="POST"
      >
        <div>
          <i>
          Мы запишем вас на автосервис и проследим за тем, что бы вам оказали услуги качественно
          <br />
          <br />
          В то же время, получая заказ от нас, автосервис получает дополнительный стимул выполнить свою работу добросовестно
          </i>
          <br /><br />
        </div>
        <input name="service" value={selectedServiceName} hidden />
        <label>Ваш телефон:</label>
        <Input name="phone" />
        <br />
        <br />
        <label>Комментарий (не обязательно):</label>
        <Input.TextArea type="text" name="message" />
        {status === "SUCCESS" && <p>Thanks!</p>}
        {status === "ERROR" && <p>Ooops! There was an error.</p>}
      </form>
    </Modal>
  );
}
