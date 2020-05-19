import React from 'react';
import { Form, Input, Switch } from 'antd'

const FilterSortingForm = ({ form: { getFieldDecorator }}) => {
  return (
    <Form>
      <Form.Item label="Поиск по названию">
        {
          getFieldDecorator('search', {
            rules: [],
          })(<Input placeholder="Введите название СТО" />)
        }
      </Form.Item>
      <Form.Item label="Поиск по услугам">
        {
          getFieldDecorator('specializationSearch', {
            rules: [],
          })(<Input placeholder="Введите название услуги" />)
        }
      </Form.Item>
      <Form.Item label="Только узкопрофильные СТО специализирующиеся исключительно на ремонте АКПП">
        {
          getFieldDecorator('specialized', {
            rules: [],
            valuePropName: 'checked',
          })(<Switch />)
        }
      </Form.Item>
    </Form>
  )
}
export default ({ onValuesChange }) => Form.create({ name: 'filterSortingForm', onValuesChange })(FilterSortingForm);

